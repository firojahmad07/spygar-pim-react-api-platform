import { Fragment, useEffect, useContext, useState, useRef, useCallback } from "react";
import { Container } from "@/components/container";
import { Users } from "./Users";
import { CreateUserDialog } from "@/pages/common/modals/CreateUserDialog";
import { SidebarContext } from "@/layouts/admin/DashboardLayoutProvider";
import apiFetcher from '@/fetcher/apiFetcher';

const UserContainer = () => {
    const context = useContext(SidebarContext);
    const [usersData, setUsersData] = useState([]);
    const [numberOfItems, setItems] = useState(0);

    const [reportUserModalOpen, setReportUserModalOpen] = useState(false);
    const itemRef = useRef<any>(null);

    const loadUsers = async () => {
        await apiFetcher.get("/users")
            .then((response: any) => {
                setItems(response.totalItems);
                setUsersData(response.member);
            }).catch(console.error);
    }
    useEffect(() => {
        loadUsers();
    }, []);

    const handleReportUserModalOpen = () => {
        setReportUserModalOpen(true);
        itemRef.current?.hide();
    };

    const handleReportUserModalClose = () => {
        setReportUserModalOpen(false);
    };

    if (context?.setCreateModal) {
        // context.setCreateModal(<CreateUserDialog
        //     open={reportUserModalOpen}
        //     onOpenChange={handleReportUserModalClose}
        // />);
    }

    return (
        <Fragment>
            <Container>
                <Users usersData={usersData} numberOfItems={numberOfItems} />
            </Container>
        </Fragment>
    );
};

export { UserContainer };
