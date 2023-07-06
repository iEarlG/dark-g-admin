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
    
  return null;
}
 
export default SetupPage;
  