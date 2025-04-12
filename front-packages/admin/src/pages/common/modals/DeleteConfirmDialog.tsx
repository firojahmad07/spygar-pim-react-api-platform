import React, { forwardRef } from 'react';
import { toAbsoluteUrl } from '@/utils';
import { Link } from 'react-router-dom';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle
} from '@/components/ui/dialog';

interface IModalReportUserProps {
    open: boolean;
    onOpenChange: () => void;
}

const DeleteConfirmDialog = forwardRef<HTMLDivElement, IModalReportUserProps>(
    ({ open, onOpenChange }, ref) => {     
        const confirmStatus = (status: boolean) => {
            console.log('status');
            // onOpenChange(status)
        }
        const buildButton = () => {
            return (
                <div className="flex items-center gap-2.5 justify-center px-5">
                    <button className="btn btn-sm btn-outline btn-success" onClick={onOpenChange}>Yes</button>
                    <button className="btn btn-sm btn-outline btn-danger" onClick={onOpenChange}>No</button>
                </div>
            );
        };

        return (
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="max-w-[600px]" ref={ref}>
                    <DialogHeader>
                        <DialogTitle>Are you sure, You want to delete this recored !</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-5 items-center px-0 py-5">
                        {buildButton()}
                    </div>
                </DialogContent>
            </Dialog>
        );
    }
);

export { DeleteConfirmDialog };
