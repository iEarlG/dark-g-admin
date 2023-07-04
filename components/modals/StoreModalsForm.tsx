"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { Modal } from "@/components/ui/modal";

export const StoreModalsForm = () => {
    const storeModal = useStoreModal();

    return (
        <Modal
            title="Create Store"
            description="Create a new store"
            isOpen={storeModal.isOpen}
            onClose={storeModal.onClose}
        >
            Future StoreControl
        </Modal>
    );
}