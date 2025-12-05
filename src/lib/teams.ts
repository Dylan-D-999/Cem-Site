import { db } from "$lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    getDocs,
    onSnapshot,
    doc,
    updateDoc,
    arrayUnion,
    serverTimestamp,
    getDoc,
    type Timestamp
} from "firebase/firestore";

// Interfaces are similar to structs in C++
//Being used here to define things like team members, teams, and invitations
export interface TeamMember {
    uid: string;
    email: string;
    role: "owner" | "member";
}

export interface Team {
    id: string;
    name: string;
    ownerId: string;
    members: TeamMember[];
    createdAt: Timestamp;
}

//Invitation interface is used to define the structure of an invitation
export interface Invitation {
    id: string;
    teamId: string;
    teamName: string;
    inviterId: string;
    inviteeEmail: string;
    status: "pending" | "accepted" | "rejected";
    createdAt: Timestamp;
}

//Create a new team
export async function createTeam(name: string, user: { uid: string; email: string }) {
    const teamData = {
        name,
        ownerId: user.uid,
        members: [
            {
                uid: user.uid,
                email: user.email,
                role: "owner"
            }
        ],
        memberIds: [user.uid],
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "teams"), teamData);
    return docRef.id;
}

// Invite a member to a team
export async function inviteMember(teamId: string, teamName: string, inviterId: string, inviteeEmail: string) {
    // Check if user is already in the team
    const teamRef = doc(db, "teams", teamId);
    const teamSnap = await getDoc(teamRef);

    //Check if someone with that email is already in the team
    if (teamSnap.exists()) {
        const teamData = teamSnap.data() as Team;
        const isMember = teamData.members.some(member => member.email === inviteeEmail);
        if (isMember) {
            throw new Error(`User with email ${inviteeEmail} is already in the team.`);
        }
    }

    const invitationData = {
        teamId,
        teamName,
        inviterId,
        inviteeEmail,
        status: "pending",
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "invitations"), invitationData);
    return docRef.id;
}

// Get teams for a specific user in real time
export function subscribeToUserTeams(userId: string, callback: (teams: Team[]) => void) {
    const q = query(collection(db, "teams"), where("memberIds", "array-contains", userId));
    return onSnapshot(q, (snapshot) => {
        const teams = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
        callback(teams);
    });
}

// Get pending invitations for a user in real time
export function subscribeToPendingInvitations(userEmail: string, callback: (invitations: Invitation[]) => void) {
    const q = query(
        collection(db, "invitations"),
        where("inviteeEmail", "==", userEmail),
        where("status", "==", "pending")
    );
    return onSnapshot(q, (snapshot) => {
        const invitations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
        callback(invitations);
    });
}

// Get invitations for a specific team (Real-time)
export function subscribeToTeamInvitations(teamId: string, callback: (invitations: Invitation[]) => void) {
    const q = query(
        collection(db, "invitations"),
        where("teamId", "==", teamId),
        where("status", "==", "pending")
    );
    return onSnapshot(q, (snapshot) => {
        const invitations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
        callback(invitations);
    });
}

//get teams for a specific user (One-time fetch - kept for reference or specific use cases)
export async function getTeamsForUser(userId: string): Promise<Team[]> {

    const q = query(collection(db, "teams"), where("memberIds", "array-contains", userId));
    const querySnapshot = await getDocs(q);

    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Team));
}

// Get pending invitations for a user
export async function getPendingInvitations(userEmail: string): Promise<Invitation[]> {
    const q = query(
        collection(db, "invitations"),
        where("inviteeEmail", "==", userEmail),
        where("status", "==", "pending")
    );
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Invitation));
}

// Accept an invitation
export async function acceptInvitation(invitationId: string, user: { uid: string; email: string }) {
    const inviteRef = doc(db, "invitations", invitationId);
    const inviteSnap = await getDoc(inviteRef);

    if (!inviteSnap.exists()) {
        throw new Error("Invitation not found");
    }

    const inviteData = inviteSnap.data() as Invitation;

    if (inviteData.status !== "pending") {
        throw new Error("Invitation is not pending");
    }

    if (inviteData.inviteeEmail !== user.email) {
        throw new Error("Invitation email does not match");
    }

    // Update invitation status
    await updateDoc(inviteRef, { status: "accepted" });

    // Add user to team
    const teamRef = doc(db, "teams", inviteData.teamId);
    await updateDoc(teamRef, {
        members: arrayUnion({
            uid: user.uid,
            email: user.email,
            role: "member"
        }),
        memberIds: arrayUnion(user.uid)
    });
}

// Reject invitation
export async function rejectInvitation(invitationId: string) {
    const inviteRef = doc(db, "invitations", invitationId);
    await updateDoc(inviteRef, { status: "rejected" });
}
