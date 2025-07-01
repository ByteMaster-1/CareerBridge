import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { MoreHorizontal } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import axios from "axios";
import { APPLICATION_API_END_POINT } from "@/utils/constant";
import { updateApplicationStatus } from "@/redux/applicationSlice";

const shortlistingStatus = ["Accept", "Reject"];


const ApplicantsTable = () => {
  const dispatch = useDispatch();
  const { applicants } = useSelector((store) => store.application);
  const visibleApplications = applicants?.applications?.filter(
    (item) => item.status !== "rejected"
  );

  const statusHandler = async (status, id) => {
    try {
      axios.defaults.withCredentials = true;
      const res = await axios.post(
        `${APPLICATION_API_END_POINT}/status/${id}/update`,
        { status }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        // Immediately update Redux state so the table re-renders
        dispatch(updateApplicationStatus({ id, status }));
      }
    } catch (error) {
      toast.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <div>
      <Table>
        <TableCaption>A list of your recent applied users</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>FullName</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Contact</TableHead>
            <TableHead>Resume</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Current Status</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {visibleApplications?.map((item) => (
            <TableRow key={item._id}>
              <TableCell>{item.applicant.fullname}</TableCell>
              <TableCell>{item.applicant.email}</TableCell>
              <TableCell>{item.applicant.phoneNumber}</TableCell>
              <TableCell>
                {item.applicant.profile?.resume ? (
                  <a
                    className="text-blue-600 cursor-pointer"
                    href={item.applicant.profile.resume}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {item.applicant.profile.resumeOriginalName}
                  </a>
                ) : (
                  "NA"
                )}
              </TableCell>
              <TableCell>
                {item.applicant.createdAt.split("T")[0]}
              </TableCell>
              <TableCell>
                {item.status === "pending"
                  ? "FreshApplication"
                  : item.status.charAt(0).toUpperCase() +
                    item.status.slice(1)}
              </TableCell>
              <TableCell className="float-right cursor-pointer">
                <Popover>
                  <PopoverTrigger>
                    <MoreHorizontal />
                  </PopoverTrigger>
                  <PopoverContent className="w-32">
                    {shortlistingStatus.map((statusOption, idx) => (
                      <div
                        key={idx}
                        className="flex items-center my-2 cursor-pointer"
                        onClick={() =>
                          statusHandler(statusOption, item._id)
                        }
                      >
                        <span>
                          {statusOption.charAt(0).toUpperCase() +
                            statusOption.slice(1)}
                        </span>
                      </div>
                    ))}
                  </PopoverContent>
                </Popover>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default ApplicantsTable;
