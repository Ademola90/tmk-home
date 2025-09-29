import { motion } from "framer-motion";
import { FiDownload, FiEye, FiFileText, FiFolder } from "react-icons/fi";
import Navbar from "../components/nav/Navbar";
import Footer from "../components/sections/Footer";
import { useEffect } from "react";

const documents = [
  {
    id: 1,
    name: "Purchase Agreement - Downtown Apartment",
    type: "Contract",
    date: "2024-01-15",
    size: "2.4 MB",
    status: "Signed",
  },
  {
    id: 2,
    name: "Property Inspection Report",
    type: "Report",
    date: "2024-01-10",
    size: "5.1 MB",
    status: "Completed",
  },
  {
    id: 3,
    name: "Title Deed - Seaside Villa",
    type: "Legal",
    date: "2023-12-20",
    size: "1.8 MB",
    status: "Verified",
  },
  {
    id: 4,
    name: "Mortgage Pre-Approval Letter",
    type: "Financial",
    date: "2024-01-05",
    size: "856 KB",
    status: "Active",
  },
];

const Documents = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="container mx-auto px-4 py-12">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          {/* Header */}
          <div className="flex items-center space-x-3 mb-8">
            <FiFolder className="w-8 h-8 text-primary" />
            <div>
              <h1 className="text-4xl font-bold text-foreground">
                My Documents
              </h1>
              <p className="text-muted-foreground">
                Access all your property-related documents
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl font-bold text-foreground mb-1">
                {documents.length}
              </div>
              <div className="text-sm text-muted-foreground">
                Total Documents
              </div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl font-bold text-green-600 mb-1">
                {
                  documents.filter(
                    (d) => d.status === "Signed" || d.status === "Verified"
                  ).length
                }
              </div>
              <div className="text-sm text-muted-foreground">Completed</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl font-bold text-blue-600 mb-1">
                {documents.filter((d) => d.status === "Active").length}
              </div>
              <div className="text-sm text-muted-foreground">Active</div>
            </div>
            <div className="bg-card border border-border rounded-xl p-6">
              <div className="text-2xl font-bold text-muted-foreground mb-1">
                {documents
                  .reduce((acc, doc) => {
                    const size = Number.parseFloat(doc.size);
                    return acc + (doc.size.includes("MB") ? size : size / 1024);
                  }, 0)
                  .toFixed(1)}
                MB
              </div>
              <div className="text-sm text-muted-foreground">Total Size</div>
            </div>
          </div>

          {/* Documents List */}
          <div className="bg-card border border-border rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-muted/50">
                  <tr>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Document Name
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Type
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Date
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Size
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Status
                    </th>
                    <th className="px-6 py-4 text-left text-sm font-semibold text-foreground">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border">
                  {documents.map((doc, index) => (
                    <motion.tr
                      key={doc.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      className="hover:bg-muted/30 transition-colors"
                    >
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-3">
                          <FiFileText className="w-5 h-5 text-primary" />
                          <span className="text-foreground font-medium">
                            {doc.name}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {doc.type}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {doc.date}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">
                        {doc.size}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium ${
                            doc.status === "Signed" || doc.status === "Verified"
                              ? "bg-green-100 text-green-800"
                              : doc.status === "Active"
                              ? "bg-blue-100 text-blue-800"
                              : "bg-yellow-100 text-yellow-800"
                          }`}
                        >
                          {doc.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center space-x-2">
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <FiEye className="w-4 h-4 text-muted-foreground" />
                          </button>
                          <button className="p-2 hover:bg-muted rounded-lg transition-colors">
                            <FiDownload className="w-4 h-4 text-muted-foreground" />
                          </button>
                        </div>
                      </td>
                    </motion.tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </motion.div>
      </div>

      <Footer />
    </div>
  );
};

export default Documents;
