/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect } from 'react';
import apiFetcher from '@/fetcher/apiFetcher';
import { Link } from 'react-router-dom';
import { DataGrid, DataGridColumnHeader, KeenIcon} from '@/components';
import { ColumnDef} from '@tanstack/react-table';
const DEFALT_LOCALE_CODE = import.meta.env.VITE_DEFAULT_LOCALE;


// Define the data structure for channels
interface IChannelsData {
  id: string;
  code: string;
  translations: [];
}

const Roles = () => {
  const [rolesData, setRolesData] = useState([]);
  const [numberOfItems, setItems] = useState(0);
  useEffect(() => {
    apiFetcher.get("/roles")
      .then((response) => {
        setItems(response.totalItems);
        setRolesData(response.member);
      })
      .catch(console.error);
  }, []);


  const columns = useMemo<ColumnDef<IChannelsData>[]>(
    () => [
      {
        accessorFn: (row) => row.code,
        id: 'code',
        header: ({ column }) => <DataGridColumnHeader title="Label" column={column} />,
        enableSorting: true,
        cell: (info) => {
          return info.row.original.code;
        },
        meta: {
          headerClassName: 'min-w-[180px]',
        }
      },
      {
        accessorFn: (row) => row.translations,
        id: 'translations',
        header: ({ column }) => <DataGridColumnHeader title="Label" column={column} />,
        enableSorting: true,
        cell: (info) => {
          let channel = info.row.original?.translations[DEFALT_LOCALE_CODE];
          console.log('channel data : ', info.row.original);
          return channel;
        },
        meta: {
          headerClassName: 'min-w-[180px]',
        }
      },
      {
        id: 'edit',
        header: () => '',
        enableSorting: false,
        cell: () => {
          return (
            <button className="btn btn-sm btn-icon btn-clear btn-light">
              <KeenIcon icon="dots-vertical" />
            </button>
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
        <h3 className="card-title font-medium text-sm">{numberOfItems} Roles</h3>

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
      </div>
    );
  };

  return (
    <DataGrid
      columns={columns}
      data={rolesData}
      rowSelection={true}
      pagination={{ size: 10 }}
      sorting={[{ id: 'code', desc: false }]}
      toolbar={<Toolbar />}
      layout={{ card: true }}
    />
  );
};

export { Roles };
