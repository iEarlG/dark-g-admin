"use client";

import { useState, useEffect } from "react";

import { StoreModalsForm } from "@/components/modals/StoreModalsForm";

export const ModalProvider = () => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    };

    return (
        <>
            <StoreModalsForm />
        </>
    )
}