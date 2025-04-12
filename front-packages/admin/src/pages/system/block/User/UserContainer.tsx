import { Fragment, useEffect, useContext, useState, useRef, useCallback } from "react";
import { Container } from "@/components/container";
import { Users } from "./Users";
import { CreateUserDialog } from "@/pages/common/modals/CreateUserDialog";
import { SidebarContext } from "@/layouts/admin/DashboardLayoutProvider";

const UserContainer = () => {
    const context = useContext(SidebarContext);
    const [reportUserModalOpen, setReportUserModalOpen] = useState(false);
    const itemRef = useRef<any>(null);

    const handleReportUserModalOpen = () => {
        setReportUserModalOpen(true);
        itemRef.current?.hide();
    };

    const handleReportUserModalClose = () => {
        setReportUserModalOpen(false);
    };

    if (context?.setCreateModal) {
        context.setCreateRoute("/users");
        context.setCreateModal(<CreateUserDialog
            open={reportUserModalOpen}
            onOpenChange={handleReportUserModalClose}
        />);
    }

    return (
        <Fragment>
            <Container>
                <Users />
            </Container>
        </Fragment>
    );
};

export { UserContainer };
