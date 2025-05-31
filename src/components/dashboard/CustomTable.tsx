import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../ui/table';

type TableData = {
  id: string;
  title: string;
  clientName: string;
  deadline: string;
  status: string;
  action: string;
};

type CustomTableProps = {
  data: TableData[];
};

export default function CustomTable({ data }: CustomTableProps) {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Project Title</TableHead>
          <TableHead>Client</TableHead>
          <TableHead>Deadline</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map(
          ({ id, title, status, action, clientName, deadline }: TableData) => (
            <TableRow key={id}>
              <TableCell className='!w-[250px] !whitespace-wrap'>
                {title}
              </TableCell>
              <TableCell className='whitespace-nowrap  text-gray-500'>
                {clientName}
              </TableCell>
              <TableCell className='whitespace-nowrap text-gray-500'>
                {deadline}
              </TableCell>
              <TableCell className='whitespace-nowrap'>
                <span className='py-2 bg-v2 px-3 rounded-full'>{status}</span>
              </TableCell>
              <TableCell className='whitespace-nowrap'>{action}</TableCell>
            </TableRow>
          )
        )}
      </TableBody>
    </Table>
  );
}
