"use client";

import React, { useEffect, useState } from "react";
import { Model } from "@/components/ui/model";
import { Button } from "@/components/ui/button";

interface AlertModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    loading: boolean;
}

export const AlertModal: React.FC<AlertModalProps> = ({
    isOpen,
    onClose,
    onConfirm,
    loading,
}) => {
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    return (
        <Model
            title="Are you sure?"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}>
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button variant="outline" disabled={loading} onClick={onClose}>Cancle</Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
            </div>
        </Model>
    );
};
