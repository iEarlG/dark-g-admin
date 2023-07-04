"use client";

import { useStoreModal } from "@/hooks/useStoreModal";
import { useEffect } from "react";

const SetupPage = () => {
    const { onOpen, isOpen } = useStoreModal();

    useEffect(() => {
      if (!isOpen) {
        onOpen();
      };
      
    }, [isOpen, onOpen]);
    
    return ( 
        <div className="p-4">
            Root Page
        </div>
    );
}
 
export default SetupPage;
  