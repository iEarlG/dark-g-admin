"use client";

import { useEffect, useState } from "react";

import { Modal } from "@/components/ui/modal";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    isLoading: boolean;
    onClose: () => void;
    onConfirm: () => void;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    isLoading,
    onClose,
    onConfirm,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
      setIsMounted(true);

    }, []);
    
    if (!isMounted) {
      return null;
    }

    return (
        <Modal
            title="Are you sure?"
            description="You will not be able to recover this store data!"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="flex items-center justify-end w-full pt-6 space-x-2">
                <Button
                    variant="outline"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancel
                </Button>
                <Button
                    variant="destructive"
                    onClick={onConfirm}
                    disabled={isLoading}
                >
                    Continue
                </Button>
            </div>
        </Modal>
    );
}