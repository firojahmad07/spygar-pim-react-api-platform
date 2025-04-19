/* eslint-disable prettier/prettier */
import { useMemo, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
// Switch
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { Switch } from "@/components/ui/switch"

import { DataGrid, DataGridColumnHeader, KeenIcon} from '@/components';
import { ColumnDef} from '@tanstack/react-table';


// Define the data structure for channels
interface ICurrencyData {
  id: string;
  code: string;
  isActive: boolean
}

interface CurrencyInterface {
  currenciesData: ICurrencyData[],
  numberOfItems: number,
  pagination: {
    first: string,
    last: string,
    next: string,
    previous?: string
  }
  onFilterChange: (filters: any) => void;
}
const Currencies = ({currenciesData, numberOfItems, pagination, onFilterChange }:CurrencyInterface ) => {
  const [isActive, setIsActiveStatus] = useState('all');

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
      },
      {
            id: 'action',
            header: () => '',
            enableSorting: false,
            cell: (info) => {      
              return (
                <Switch
                  apiUrl={`/currencies/${info.row.original.id}`}
                  defaultChecked={info.row.original.isActive}
                  checked={info.row.original.isActive}
                  payloadKey="isActive"
                  onFilterChange={onFilterChange}
                  onToggle={(checked) => console.log('Switched to', checked)}
                />
              )
            },
            meta: {
              headerClassName: 'w-[60px]'
            }
          }
    ],
    []
  );

  type ToolbarProps = {
    onFilterChange: (filters: any) => void;
  };
  const Toolbar = ({onFilterChange} : ToolbarProps) => {
    const [searchInput, setSearchInput] = useState('');
    
    const changeHnadler = (value: any) => {
      setIsActiveStatus(value);
      const filterValue = (value != 'all') ? `?isActive=${value}` : '';
      onFilterChange(filterValue);
    }

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
      data={currenciesData}
      rowSelection={true}
      pagination={{ size: 10, view: pagination } }
      sorting={[{ id: 'isActive', desc: false }]}
      toolbar={<Toolbar onFilterChange={onFilterChange} />}
      layout={{ card: false }}
    />
  );
};

export { Currencies };
