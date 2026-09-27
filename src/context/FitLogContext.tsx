"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { Workout } from "@/types/workout";

interface FitLogContextType {
  plan: Workout[];
  saved: Workout[];
  doneIds: number[];
  isLoaded: boolean;
  addToPlan: (workout: Workout) => { success: boolean; message: string };
  removeFromPlan: (id: number) => void;
  saveForLater: (workout: Workout) => { success: boolean; message: string };
  removeFromSaved: (id: number) => void;
  toggleDone: (id: number) => boolean;
  isInPlan: (id: number) => boolean;
  isSaved: (id: number) => boolean;
  isDone: (id: number) => boolean;
  showToast: (message: string) => void;
}

const FitLogContext = createContext<FitLogContextType | undefined>(undefined);

export function FitLogProvider({ children }: { children: React.ReactNode }) {
  const [plan, setPlan] = useState<Workout[]>([]);
  const [saved, setSaved] = useState<Workout[]>([]);
  const [doneIds, setDoneIds] = useState<number[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);
  const [toastMessage, setToastMessage] = useState<string>("");
  const [toastVisible, setToastVisible] = useState(false);

  // Load from localStorage on client mount
  useEffect(() => {
    try {
      const storedPlan = localStorage.getItem("fitlog-plan");
      const storedSaved = localStorage.getItem("fitlog-saved");
      const storedDone = localStorage.getItem("fitlog-done");

      if (storedPlan) setPlan(JSON.parse(storedPlan));
      if (storedSaved) setSaved(JSON.parse(storedSaved));
      if (storedDone) setDoneIds(JSON.parse(storedDone));
    } catch (e) {
      console.error("Failed to load FitLog data from localStorage:", e);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save to localStorage when state changes
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-plan", JSON.stringify(plan));
    }
  }, [plan, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-saved", JSON.stringify(saved));
    }
  }, [saved, isLoaded]);

  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("fitlog-done", JSON.stringify(doneIds));
    }
  }, [doneIds, isLoaded]);

  const showToast = (message: string) => {
    setToastMessage(message);
    setToastVisible(true);
    const timer = setTimeout(() => {
      setToastVisible(false);
    }, 2800);
    return () => clearTimeout(timer);
  };

  const addToPlan = (workout: Workout) => {
    if (plan.some((w) => w.id === workout.id)) {
      showToast("Already in today's plan");
      return { success: false, message: "Already in today's plan" };
    }
    if (plan.length >= 5) {
      showToast("Plan is full — maximum 5 workouts");
      return { success: false, message: "Plan is full — maximum 5 workouts" };
    }
    setPlan((prev) => [...prev, workout]);
    showToast("Added to today's plan");
    return { success: true, message: "Added to today's plan" };
  };

  const removeFromPlan = (id: number) => {
    setPlan((prev) => prev.filter((w) => w.id !== id));
    setDoneIds((prev) => prev.filter((dId) => dId !== id));
    showToast("Workout removed from today's plan");
  };

  const saveForLater = (workout: Workout) => {
    if (saved.some((w) => w.id === workout.id)) {
      showToast("Already saved");
      return { success: false, message: "Already saved" };
    }
    setSaved((prev) => [...prev, workout]);
    showToast("Saved for later");
    return { success: true, message: "Saved for later" };
  };

  const removeFromSaved = (id: number) => {
    setSaved((prev) => prev.filter((w) => w.id !== id));
    showToast("Workout removed from saved");
  };

  const toggleDone = (id: number) => {
    let nowDone = false;
    setDoneIds((prev) => {
      if (prev.includes(id)) {
        nowDone = false;
        return prev.filter((dId) => dId !== id);
      } else {
        nowDone = true;
        return [...prev, id];
      }
    });
    showToast("Workout marked as done");
    return nowDone;
  };

  const isInPlan = (id: number) => plan.some((w) => w.id === id);
  const isSaved = (id: number) => saved.some((w) => w.id === id);
  const isDone = (id: number) => doneIds.includes(id);

  return (
    <FitLogContext.Provider
      value={{
        plan,
        saved,
        doneIds,
        isLoaded,
        addToPlan,
        removeFromPlan,
        saveForLater,
        removeFromSaved,
        toggleDone,
        isInPlan,
        isSaved,
        isDone,
        showToast,
      }}
    >
      {children}
      {/* Toast Notification Container */}
      {toastVisible && toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 flex items-center gap-2 rounded-lg border border-[#343943] bg-[#181b21] px-5 py-3 text-sm text-white shadow-2xl transition-all duration-300 animate-in fade-in slide-in-from-bottom-5">
          <span className="text-[#baff00] font-bold">✓</span>
          <span>{toastMessage}</span>
        </div>
      )}
    </FitLogContext.Provider>
  );
}

export function useFitLog() {
  const context = useContext(FitLogContext);
  if (!context) {
    throw new Error("useFitLog must be used inside FitLogProvider");
  }
  return context;
}
