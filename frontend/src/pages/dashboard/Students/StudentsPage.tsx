import { DataTable } from "@/components/data-table/data-table";
import { columns } from "./students.columns";
import rawData from "./students.json";
import { Student } from "./schema";

const data: Student[] = rawData.map((student) => ({
  ...student,
  Status: student.Status === "activo" ? "activo" : "inactivo",
}));

const StudentsPage = () => {
  return <DataTable columns={columns} data={data} resource="students" />;
};

export default StudentsPage;
