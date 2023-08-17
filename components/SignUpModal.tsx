"use client";

import React, { useEffect } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useRouter } from "next/navigation";

import Modal from "@/components/Modal";
import useSignUpModal from "@/hooks/modals/useSignUpModal";
import AuthBlock from "@/components/AuthBlock";

const SignInModal = () => {
  const router = useRouter();
  const { session } = useSessionContext();
  const { onClose, isOpen } = useSignUpModal();

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
      title="Sign Up"
      description="Creating your account"
      isOpen={isOpen}
      onChange={onChange}
    >
      <AuthBlock view="sign_up" />
    </Modal>
  );
};

export default SignInModal;
