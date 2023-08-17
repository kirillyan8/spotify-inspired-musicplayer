"use client";

import React, { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import useSignInModal from "@/hooks/modals/useSignInModal";
import AuthBlock from "@/components/AuthBlock";

const SignInModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useSignInModal();

  useEffect(() => {
    if (session) {
      router.refresh();
      onClose();
    }
  }, [router, session, onClose]);

  const onChange = (open: boolean) => {
    if (!open) onClose();
  };

  return (
    <Modal
      title="Welcome back"
      description="Logging to your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <AuthBlock />
    </Modal>
  );
};

export default SignInModal;
