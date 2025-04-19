/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect, useRef, useContext } from 'react';
import { Link } from 'react-router-dom';
import { DataGrid, DataGridColumnHeader, KeenIcon} from '@/components';
import { ColumnDef} from '@tanstack/react-table';
import { DeleteConfirmDialog } from '@/pages/products/Modals/DeleteConfirmDialog';


// Define the data structure for channels
interface ILocalesData {
  id: string;
  fullName: string;
  email: string,
  username: string,
  status: boolean,
  lastLogin: string
}

interface IUsersData {
  id: string;
  fullName: string;
  email: string,
  username: string,
  status: boolean,
  lastLogin: string

}

type UsersProps = {
  usersData: IUsersData[]; // or a more specific type
  numberOfItems: number;
};


const Users = ({usersData, numberOfItems} : UsersProps)  => {
  const [checked, setChecked] = useState(false);
  const [reportUserModalOpen, setReportUserModalOpen] = useState(false);
  const itemRef = useRef<any>(null);
  
  const handleReportUserModalOpen = () => {
    setReportUserModalOpen(true);
    itemRef.current?.hide();
  };
  const handleReportUserModalClose = () => {
    setReportUserModalOpen(false);
  };



  const checkedChangeHandler = () => {
    setChecked((prev) => {
      console.log("Previous state:", prev);
      return true; // New state value
    });

    console.log("new state:", checked);

  }

  const columns = useMemo<ColumnDef<IUsersData>[]>(
    () => [
      {
        accessorFn: (row) => row.id,
        id: 'id',
        header: ({ column }) => <DataGridColumnHeader title="id" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.id;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.fullName,
        id: 'fullName',
        header: ({ column }) => <DataGridColumnHeader title="Name" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.fullName;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.email,
        id: 'email',
        header: ({ column }) => <DataGridColumnHeader title="email" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.email;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.username,
        id: 'username',
        header: ({ column }) => <DataGridColumnHeader title="username" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.username;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.status,
        id: 'status',
        header: ({ column }) => <DataGridColumnHeader title="Active" column={column} />,
        enableSorting: false,
        cell: (info) => {
          // setChecked(true);
          // setChecked(info.row.original.status);
          return (
            <label className="switch">
                <input 
                  type="checkbox" 
                  value="0"
                  checked={checked}
                  onChange={checkedChangeHandler}
                  />
            </label>
          )
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        id: 'edit',
        header: () => '',
        enableSorting: false,
        cell: () => {                    
          return (
            <div className="btn">              
              <button className="btn btn-light btn-sm">
                <i className="ki-filled ki-trash"></i>
              </button>
              <Link to={`/account/1/user-profile`} className="btn btn-light btn-sm">
                <i className="ki-filled ki-pencil"></i>
              </Link>
            </div>            
          );
        },
        meta: {
          headerClassName: 'w-[60px]'
        }
      }
    ],
    []
  );

  const Toolbar = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
      <div className="card-header flex-wrap gap-2 border-b-0 px-5">
        <h3 className="card-title font-medium text-sm">{numberOfItems} Users</h3>

        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                type="text"
                placeholder="Search"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>
        </div>
        <DeleteConfirmDialog open={reportUserModalOpen} onOpenChange={handleReportUserModalClose} />
      </div>

    );
  };

  return (
    <DataGrid
      columns={columns}
      data={usersData}
      rowSelection={true}
      pagination={{ size: 10 }}
      sorting={[{ id: 'id', desc: false }]}
      toolbar={<Toolbar />}
      layout={{ card: false }}
    />
  );
};

export { Users };
