import { db } from "$lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    deleteDoc,
    doc,
    serverTimestamp,
    type Timestamp
} from "firebase/firestore";

export interface SharedFile {
    id: string;
    name: string;
    url: string;
    uploaderId: string;
    uploaderEmail: string;
    teamId: string;
    createdAt: Timestamp;
}

// Share a file link to Firestore
export async function shareFileLink(
    name: string,
    url: string,
    teamId: string,
    user: { uid: string; email: string }
) {
    await addDoc(collection(db, "files"), {
        name,
        url,
        uploaderId: user.uid,
        uploaderEmail: user.email,
        teamId: teamId,
        createdAt: serverTimestamp()
    });
}

// Subscribe to files for a specific team
export function subscribeToTeamFiles(teamId: string, callback: (files: SharedFile[]) => void) {
    const q = query(
        collection(db, "files"),
        where("teamId", "==", teamId)
    );

    return onSnapshot(q, (snapshot) => {
        const files = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as SharedFile));
        // Sort client-side to avoid Firestore index requirement
        files.sort((a, b) => {
            const dateA = a.createdAt?.seconds || 0;
            const dateB = b.createdAt?.seconds || 0;
            return dateB - dateA;
        });
        callback(files);
    });
}

// Delete a file link
export async function deleteFile(file: SharedFile) {
    try {
        // Delete from Firestore
        await deleteDoc(doc(db, "files", file.id));
    } catch (error) {
        console.error("Error deleting file:", error);
        throw error;
    }
}
