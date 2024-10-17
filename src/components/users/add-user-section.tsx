"use client";

import {Button} from "@/components/ui/button";
import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import UserForm from "@/components/users/user-form";
import {useUserStore} from "@/store/userStore";
import {Cross2Icon, PlusIcon} from "@radix-ui/react-icons";
import {AnimatePresence, motion} from "framer-motion";
import * as React from "react";
import {useEffect, useState} from "react";

export default function AddUserSection() {
    const [isOpen, setIsOpen] = useState(false);

    const selectedUser = useUserStore((state) => state.selectedUser);
    const selectUser = useUserStore((state) => state.selectUser);

    const toggleForm = () => {
        if (isOpen && selectedUser) {
            selectUser(null);
        }
        setIsOpen((prev) => !prev);
    };

    useEffect(() => {
        if (selectedUser) {
            setIsOpen(true);
        }
    }, [selectedUser]);

    return (
        <div className="flex flex-col items-end gap-4">
            <Button
                variant="ghost"
                size="icon"
                onClick={toggleForm}
                aria-label={isOpen ? "Close form" : "Open form"}
                className="p-1"
            >
                {isOpen ? (
                    <Cross2Icon className="h-6 w-6 text-white rounded-lg bg-red-500"/>
                ) : (
                    <PlusIcon className="h-6 w-6 bg-green-500 text-white rounded-lg"/>
                )}
            </Button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        key="add-user-card"
                        initial={{opacity: 0, height: 0}}
                        animate={{opacity: 1, height: "auto"}}
                        exit={{opacity: 0, height: 0}}
                        className="overflow-hidden w-full p-1"
                    >
                        <Card className="shadow-lg w-full">
                            <CardHeader>
                                <CardTitle className="text-lg">{selectedUser ? "Edit User" : "Add User"}</CardTitle>
                            </CardHeader>
                            <CardContent className="transition-opacity duration-300 ease-in-out opacity-100">
                                <UserForm toggleForm={toggleForm}/>
                            </CardContent>
                        </Card>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
}
