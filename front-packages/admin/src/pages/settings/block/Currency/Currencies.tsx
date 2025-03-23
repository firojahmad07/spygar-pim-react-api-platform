/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect } from 'react';
import apiFetcher from '@/fetcher/apiFetcher';
import { Link } from 'react-router-dom';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from "@radix-ui/react-switch";

import { DataGrid, DataGridColumnHeader, KeenIcon} from '@/components';
import { ColumnDef} from '@tanstack/react-table';


// Define the data structure for channels
interface ICurrencyData {
  id: string;
  code: string;
  isActive: boolean
}

const Currencies = () => {
  const [localesData, setLocalesData] = useState([]);
  const [numberOfItems, setItems] = useState(0);
  const [loading, setLoading] = useState(false);

  const fetchData = async (status: any) => {
    setLoading(true);
    try {
      const response = await apiFetcher.get(`/currencies?isActive=${status}`);
      setItems(response.totalItems);
      setLocalesData(response.member);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData('all');
  }, []);

  const columns = useMemo<ColumnDef<ICurrencyData>[]>(
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
        accessorFn: (row) => row.isActive,
        id: 'isActive',
        header: ({ column }) => <DataGridColumnHeader title="Enabled" column={column} />,
        enableSorting: false,
        cell: (info) => {
          let statusColor = info.row.original.isActive ? 'success' : 'danger';
          let statusLabel = info.row.original.isActive ? 'Enabled' : 'Disabled';
          return (

            <span className={`badge badge-${statusColor} shrink-0 badge-outline rounded-[0px]`}>
              <span className={`size-1.5 rounded-full bg-${statusColor} me-1.5`}></span>
              {statusLabel}
            </span>
          )
        },
        meta: {
          headerClassName: 'min-w-[180px]'
        }
      }
    ],
    []
  );

  type ToolbarProps = {
    onFilterChange: (status: any) => void;
  };
  const Toolbar = ({onFilterChange} : ToolbarProps) => {
    const [searchInput, setSearchInput] = useState('');
    const [isActive, setIsActiveStatus] = useState('all');
    
    const changeHnadler = (value: any) => {
      setIsActiveStatus(value);
      console.log("update status : ", value);
      onFilterChange(value) 
    }
    console.log("update status 3: ", isActive);

    return (
      <div className="card-header flex-wrap gap-2 border-b-0 px-5">
        <h3 className="card-title font-medium text-sm">{numberOfItems} users</h3>

        <div className="flex flex-wrap gap-2 lg:gap-5">
          <div className="flex">
            <label className="input input-sm">
              <KeenIcon icon="magnifier" />
              <input
                type="text"
                placeholder="Search users"
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </label>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <Select defaultValue={`${isActive}`} onValueChange={changeHnadler}>
              <SelectTrigger className="w-28" size="sm">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent className="w-32" >
                <SelectItem value="all">All</SelectItem>
                <SelectItem value="1">Active</SelectItem>
                <SelectItem value="0">Disabled</SelectItem>
              </SelectContent>
            </Select>
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
      toolbar={<Toolbar onFilterChange={fetchData} />}
      layout={{ card: false }}
    />
  );
};

export { Currencies };
