import { db } from "$lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    orderBy,
    onSnapshot,
    serverTimestamp,
    type Timestamp
} from "firebase/firestore";

export interface Message {
    id: string;
    teamId: string;
    senderId: string;
    senderEmail: string;
    content: string;
    createdAt: Timestamp;
}

// Send a message to a team
export async function sendMessage(teamId: string, user: { uid: string; email: string }, content: string) {
    const messageData = {
        teamId,
        senderId: user.uid,
        senderEmail: user.email,
        content,
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "messages"), messageData);
    return docRef.id;
}

// Subscribe to messages for a specific team
export function subscribeToTeamMessages(teamId: string, callback: (messages: Message[]) => void) {
    const q = query(
        collection(db, "messages"),
        where("teamId", "==", teamId)
    );

    return onSnapshot(q, (snapshot) => {
        const messages = snapshot.docs
            .map(doc => ({ id: doc.id, ...doc.data() } as Message))
            .sort((a, b) => {
                const t1 = a.createdAt?.toMillis ? a.createdAt.toMillis() : Date.now();
                const t2 = b.createdAt?.toMillis ? b.createdAt.toMillis() : Date.now();
                return t1 - t2;
            });
        callback(messages);
    });
}
