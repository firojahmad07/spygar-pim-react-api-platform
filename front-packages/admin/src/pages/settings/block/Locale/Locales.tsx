/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect } from 'react';
import apiFetcher from '@/fetcher/apiFetcher';
import { Link } from 'react-router-dom';
// import { Switch } from '@radix-ui/react-switch';

import { Switch } from "@radix-ui/react-switch";
// import { Switch } from "";

import { DataGrid, DataGridColumnHeader, KeenIcon} from '@/components';
import { ColumnDef} from '@tanstack/react-table';


// Define the data structure for channels
interface ILocalesData {
  id: string;
  code: string;
  label: string,
  isActive: boolean
}

const Locales = () => {
  const [localesData, setLocalesData] = useState([]);
  const [numberOfItems, setItems] = useState(0);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    apiFetcher.get("/locales")
      .then((response:any) => {
        setItems(response.totalItems);
        setLocalesData(response.member);
      })
      .catch(console.error);
  }, []);

  const checkedChangeHandler = () => {
    setChecked((prev) => {
      console.log("Previous state:", prev);
      return true; // New state value
    });

    console.log("new state:", checked);

  }

  const columns = useMemo<ColumnDef<ILocalesData>[]>(
    () => [
      {
        accessorFn: (row) => row.code,
        id: 'code',
        header: ({ column }) => <DataGridColumnHeader title="Code" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.code;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.label,
        id: 'label',
        header: ({ column }) => <DataGridColumnHeader title="Label" column={column} />,
        enableSorting: false,
        cell: (info) => {
          return info.row.original.label;
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      },
      {
        accessorFn: (row) => row.isActive,
        id: 'isActive',
        header: ({ column }) => <DataGridColumnHeader title="Active" column={column} />,
        enableSorting: false,
        cell: (info) => {
          setChecked(true);
          // setChecked(info.row.original.isActive);
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
      }
    ],
    []
  );

  const Toolbar = () => {
    const [searchInput, setSearchInput] = useState('');

    return (
      <div className="card-header flex-wrap gap-2 border-b-0 px-5">
        <h3 className="card-title font-medium text-sm">{numberOfItems} Locale</h3>

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
      data={localesData}
      rowSelection={true}
      pagination={{ size: 10 }}
      sorting={[{ id: 'code', desc: false }]}
      toolbar={<Toolbar />}
      layout={{ card: false }}
    />
  );
};

export { Locales };
