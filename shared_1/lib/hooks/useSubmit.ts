import { useState } from "react";

export function useSubmit() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (submitFunction: () => Promise<void>) => {
    if (isSubmitting) return;

    setIsSubmitting(true);
    try {
      await submitFunction();
    } finally {
      setIsSubmitting(false);
    }
  };

  return { isSubmitting, handleSubmit };
}
