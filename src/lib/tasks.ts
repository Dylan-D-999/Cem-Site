//Task logic 
import { db } from "$lib/firebase";
import {
    collection,
    addDoc,
    query,
    where,
    onSnapshot,
    doc,
    updateDoc,
    deleteDoc,
    serverTimestamp,
    type Timestamp
} from "firebase/firestore";

//Structure of a task
export interface Task {
    id: string;
    teamId: string;
    content: string;
    isCompleted: boolean;
    createdBy: string;
    createdAt: Timestamp;
}
//func to add tasks
export async function addTask(teamId: string, content: string, userId: string) {
    const taskData = {
        teamId,
        content,
        isCompleted: false,
        createdBy: userId,
        createdAt: serverTimestamp()
    };

    const docRef = await addDoc(collection(db, "tasks"), taskData);
    return docRef.id;
}
// func to subscribe to tasks for real time syncing over sessiona andd accounts
export function subscribeToTeamTasks(teamId: string, callback: (tasks: Task[]) => void) {
    const q = query(
        collection(db, "tasks"),
        where("teamId", "==", teamId)
    );

    return onSnapshot(q, (snapshot) => {
        const tasks = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Task));
        // Sort by createdAt desc
        tasks.sort((a, b) => {
            const timeA = a.createdAt?.seconds || 0;
            const timeB = b.createdAt?.seconds || 0;
            return timeB - timeA;
        });
        callback(tasks);
    }, (error) => {
        console.error("Error subscribing to tasks:", error);
    });
}
//func to toggle task completion
export async function toggleTaskCompletion(taskId: string, currentStatus: boolean) {
    const taskRef = doc(db, "tasks", taskId);
    await updateDoc(taskRef, {
        isCompleted: !currentStatus
    });
}
//func to delete task
export async function deleteTask(taskId: string) {
    const taskRef = doc(db, "tasks", taskId);
    await deleteDoc(taskRef);
}
