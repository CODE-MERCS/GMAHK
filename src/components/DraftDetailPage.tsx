import { useState, useEffect, Fragment } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Loader2, ArrowLeft, Send, CheckCircle } from "lucide-react";
import { getDraftById, validateDraftField, sendDraftToForm } from "../api/form";
import toast, { Toaster } from "react-hot-toast";

// Mapping of category IDs to field keys and their corresponding image fields
const categoryMapping = {
  1: { field: "perlawatanJemaat", imageField: "fotoPerlawatanJemaat" },
  2: { field: "perlawatannonSDA", imageField: "fotoPerlawatannonSDA" },
  3: { field: "perlawatanPendeta", imageField: "fotoPerlawatanPendeta" },
  4: { field: "pelatihanUNI", imageField: "fotoPelatihanUNI", optional: true },
  5: {
    field: "pelatihanKonferens",
    imageField: "fotoPelatihanKonferens",
    optional: true,
  },
  6: {
    field: "pelatihanPendeta",
    imageField: "fotoPelatihanPendeta",
    optional: true,
  },
  7: {
    field: "kelompokPeduli",
    imageField: "fotoKelompokPeduli",
    optional: true,
  },
  8: {
    field: "tamuKelompokPeduli",
    imageField: "fotoTamuKelompok",
    optional: true,
  },
  9: {
    field: "pembelajaranAlkitab",
    imageField: "fotoPembelajaran",
    optional: true,
  },
  10: { field: "baptisanBulanIni", imageField: "fotoBaptisanBulanIni" },
  11: {
    field: "seminarKhotbah",
    imageField: "fotoSeminarKhotbah",
    optional: true,
  },
  12: {
    field: "penanamanGereja",
    imageField: "fotoPenanamanGereja",
    optional: true,
  },
  13: { field: "komiteJemaat", imageField: "fotoKomiteJemaat" },
};

interface DraftDetail {
  id: number;
  tahun: number;
  bulan: string;
  jemaat?: string;
  wilayah?: string;
  ketuaJemaatName?: string;
  username: string;
  userId?: number;
  hadirSabat2?: number;
  hadirSabat7?: number;
  persentaseKehadiranBulan?: number;
  jumlahKKR?: number;
  targetBaptisan?: number;
  retreatPendeta?: number;
  ketuaJemaat?: number;
  jumlahDiakon?: number;
  berkhotbahSabat?: number;
  berkhotbahSabat7?: number;
  persentasiDiakones?: number;
  jumlahPersembahan?: number;
  perlawatanJemaat?: number;
  perlawatannonSDA?: number;
  perlawatanPendeta?: number;
  baptisanBulanIni?: number;
  komiteJemaat?: number;
  createdAt?: string;
  updatedAt?: string;
  // Image fields
  fotoPerlawatanJemaat?: string;
  fotoPerlawatannonSDA?: string;
  fotoPerlawatanPendeta?: string;
  fotoPelatihanUNI?: string;
  fotoPelatihanKonferens?: string;
  fotoPelatihanPendeta?: string;
  fotoKelompokPeduli?: string;
  fotoTamuKelompok?: string;
  fotoPembelajaran?: string;
  fotoBaptisanBulanIni?: string;
  fotoSeminarKhotbah?: string;
  fotoPenanamanGereja?: string;
  fotoKomiteJemaat?: string;
  [key: string]: any; // Index signature to allow any string key
}

// Form structure for rendering
const formStructure = [
  {
    key: "bulan",
    label: "Bulan",
    validate: false,
  },
  {
    key: "tahun",
    label: "Tahun",
    validate: false,
  },
  {
    key: "jemaat",
    label: "Jemaat",
    validate: false,
  },
  {
    key: "wilayah",
    label: "Wilayah",
    validate: false,
  },
  {
    key: "ketuaJemaatName",
    label: "Nama Ketua Jemaat",
    validate: false,
  },
  {
    category: "Jumlah Anggota Jemaat",
    items: [
      {
        key: "hadirSabat2",
        label:
          "(a). Jumlah Anggota Yang Hadir Sabat Ke-2 Dalam Triwulan Berjalan",
        validate: false,
      },
      {
        key: "hadirSabat7",
        label:
          "(b). Jumlah Anggota Yang Hadir Sabat Ke-7 Dalam Triwulan Berjalan",
        validate: false,
      },
      {
        key: "persentaseKehadiranBulan",
        label: "(c). Jumlah Persentasi Kehadiran Anggota Per Bulan",
        validate: false,
      },
    ],
  },
  {
    key: "perlawatanJemaat",
    label: "2. Jumlah Perlawatan Kepada Anggota Jemaat (Jiwa)",
    validate: true,
    id: 1,
  },
  {
    key: "perlawatannonSDA",
    label: "3. Jumlah Perlawatan Kepada Non SDA",
    validate: true,
    id: 2,
  },
  {
    key: "perlawatanPendeta",
    label: "4. Jumlah Perlawatan Kepada Pendeta/Pemuka Anggota Lainnya",
    validate: true,
    id: 3,
  },
  {
    key: "pelatihanUNI",
    label: "5. Jumlah Pelatihan Yang di Ikuti dari UNI/SSD/GC",
    validate: true,
    id: 4,
  },
  {
    key: "pelatihanKonferens",
    label: "6. Jumlah Pelatihan Yang di Ikuti dari Konferens/Disctrict",
    validate: true,
    id: 5,
  },
  {
    key: "pelatihanPendeta",
    label: "7. Jumlah Pelatihan Yang di lakukan Pendeta/Ketua-ketua Jemaat",
    validate: true,
    id: 6,
  },
  {
    key: "kelompokPeduli",
    label: "8. Jumlah Kelompok Peduli di Jemaat",
    validate: true,
    id: 7,
  },
  {
    key: "tamuKelompokPeduli",
    label: "9. Jumlah Tamu Dalam Kelompok Peduli",
    validate: true,
    id: 8,
  },
  {
    key: "pembelajaranAlkitab",
    label:
      "10. Jumlah Orang di Berikan Pembelajaran Alkitab Non SDA (Belum di Baptis)",
    validate: true,
    id: 9,
  },
  {
    key: "jumlahKKR",
    label: "11. Jumlah KKR Oleh Ketua/Diakon",
    validate: false,
  },
  {
    key: "targetBaptisan",
    label: "12. Target Baptisan Jemaat Tahun ini",
    validate: false,
  },
  {
    key: "baptisanBulanIni",
    label: "13. Baptisan Bulan Ini",
    validate: true,
    id: 10,
  },
  {
    key: "seminarKhotbah",
    label: "14. Jumlah Mengikuti/Mangadakan Seminar Khotbah",
    validate: true,
    id: 11,
  },
  {
    key: "retreatPendeta",
    label: "15. Jumlah Retreat Yang Melibatkan Pendeta Jemaat",
    validate: false,
  },
  {
    key: "penanamanGereja",
    label: "16. Jumlah Penanaman Gereja Baru/Ladang Baru",
    validate: true,
    id: 12,
  },
  { key: "ketuaJemaat", label: "17. Jumlah Ketua Jemaat", validate: false },
  { key: "jumlahDiakon", label: "18. Jumlah Diakon", validate: false },
  {
    category: "Jumlah Diakones",
    items: [
      {
        key: "berkhotbahSabat",
        label: "(a). Jumlah Berkhotbah Pada Hari Sabat",
        validate: false,
      },
      {
        key: "berkhotbahSabat7",
        label: "(b). Jumlah Berkhotbah Pada Hari Sabat Ke-7",
        validate: false,
      },
      {
        key: "persentasiDiakones",
        label: "(c). Jumlah Persentasi Kehadiran Anggota per Bulan",
        validate: false,
      },
      {
        key: "jumlahPersembahan",
        label: "(d). Jumlah Persembahan",
        validate: false,
      },
      {
        key: "komiteJemaat",
        label: "(e). Jumlah Komite Jemaat (Paling kurang 1 kali dalam sebulan)",
        validate: true,
        id: 13,
      },
    ],
  },
];

const DraftDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [acknowledged, setAcknowledged] = useState(false);
  const handleAcknowledgementChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    setAcknowledged(e.target.checked);
  };
  const navigate = useNavigate();
  const [draft, setDraft] = useState<DraftDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState<Record<string, any>>({});
  const [selectedFiles, setSelectedFiles] = useState<
    Record<string, File | null>
  >({});
  const [validating, setValidating] = useState<Record<string, boolean>>({});
  const [validationStatus, setValidationStatus] = useState<
    Record<string, boolean>
  >({});
  const [sending, setSending] = useState(false);
  const [sendSuccess, setSendSuccess] = useState(false);

  useEffect(() => {
    const fetchDraftDetail = async () => {
      if (!id) return;

      setLoading(true);
      try {
        const response = await getDraftById(parseInt(id, 10));

        if (response && response.data) {
          const draftData = response.data;
          setDraft(draftData);

          // Initialize form data with draft values
          const initialFormData: Record<string, any> = {};
          Object.entries(draftData).forEach(([key, value]) => {
            if (
              key !== "id" &&
              key !== "createdAt" &&
              key !== "updatedAt" &&
              key !== "userId" &&
              key !== "username" &&
              !key.startsWith("foto")
            ) {
              // Check for string fields
              if (
                key === "jemaat" ||
                key === "wilayah" ||
                key === "ketuaJemaatName"
              ) {
                initialFormData[key] = value || "";
              } else {
                initialFormData[key] = value;
              }
            }
          });
          setFormData(initialFormData);

          // Initialize validation status
          const initialValidationStatus: Record<string, boolean> = {};
          Object.values(categoryMapping).forEach((mapping) => {
            const { field, imageField } = mapping;
            initialValidationStatus[field] = !!draftData[imageField];
          });
          setValidationStatus(initialValidationStatus);
        } else {
          setError("Data draft tidak ditemukan");
        }
      } catch (err) {
        console.error("Error fetching draft detail:", err);
        setError("Gagal memuat detail draft. Silakan coba lagi nanti.");
        toast.error("Gagal memuat detail draft");
      } finally {
        setLoading(false);
      }
    };

    fetchDraftDetail();
  }, [id]);

  // Handle input changes
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Handle file selection
  const handleFileChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    key: string
  ) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFiles((prev) => ({
        ...prev,
        [key]: e.target.files?.[0] || null,
      }));
    }
  };

  // Get the image field name for a given data field
  const getImageFieldName = (fieldKey: string): string | null => {
    const mapping = Object.values(categoryMapping).find(
      (m) => m.field === fieldKey
    );
    return mapping ? mapping.imageField : null;
  };

  // Handle validation for a specific field
  const handleValidation = async (categoryId: number, fieldKey: string) => {
    if (!id) return;

    setValidating((prev) => ({ ...prev, [fieldKey]: true }));

    try {
      const formDataToSend = new FormData();
      formDataToSend.append(fieldKey, formData[fieldKey]?.toString() || "");

      if (selectedFiles[fieldKey]) {
        formDataToSend.append("image", selectedFiles[fieldKey] as File);
      }

      const response = await validateDraftField(
        categoryId,
        parseInt(id, 10),
        formDataToSend
      );

      // Update local draft data with the response
      if (response && response.data) {
        // Update the draft state
        setDraft((prev) => {
          if (!prev) return response.data;
          return { ...prev, ...response.data };
        });

        // Update validation status explicitly
        const imageField = getImageFieldName(fieldKey);
        if (imageField && response.data[imageField]) {
          setValidationStatus((prev) => ({ ...prev, [fieldKey]: true }));
        }

        toast.success("Validasi berhasil");
      }
    } catch (error) {
      console.error("Validation error:", error);
      toast.error("Validasi gagal");
    } finally {
      setValidating((prev) => ({ ...prev, [fieldKey]: false }));
    }
  };

  // Check if all required fields are validated
  const getRequiredUnvalidatedFields = (): string[] => {
    const unvalidatedFields: string[] = [];

    Object.entries(categoryMapping).forEach(([categoryId, mapping]) => {
      // Skip optional fields
      if (mapping.optional) return;

      const { field, imageField } = mapping;

      // Check if the field exists, has value > 0, and has an image
      if (!draft?.[field] || draft[field] <= 0 || !draft?.[imageField]) {
        unvalidatedFields.push(field);
      }
    });

    return unvalidatedFields;
  };

  // Handle sending draft to form
  const handleSendDraft = async () => {
    if (!id) return;

    // Check for required fields first
    const unvalidatedFields = getRequiredUnvalidatedFields();
    if (unvalidatedFields.length > 0) {
      // Map field names to more user-friendly labels
      const fieldLabels = unvalidatedFields.map((field) => {
        const formItem = formStructure.find((item) => item.key === field);
        if (formItem) return formItem.label;

        // Check in nested items
        for (const category of formStructure) {
          if (!category.items) continue;
          const nestedItem = category.items.find((item) => item.key === field);
          if (nestedItem) return nestedItem.label;
        }

        return field; // Fallback to field name if label not found
      });

      toast.error(
        <div>
          <p>Validasi belum lengkap untuk field-field berikut:</p>
          <ul className="mt-2 list-disc pl-4">
            {fieldLabels.map((label, idx) => (
              <li key={idx}>{label}</li>
            ))}
          </ul>
        </div>,
        { duration: 5000 }
      );
      return;
    }

    setSending(true);
    try {
      const response = await sendDraftToForm(parseInt(id, 10));
      setSendSuccess(true);
      toast.success("Draft berhasil dikirim");
    } catch (error: any) {
      console.error("Error sending draft:", error);

      // Display validation errors if available
      if (error.response?.data?.invalidFields) {
        const fields = error.response.data.invalidFields
          .map((f: any) => f.field)
          .join(", ");
        toast.error(`Validasi gagal untuk field: ${fields}`);
      } else {
        toast.error("Gagal mengirim draft");
      }
    } finally {
      setSending(false);
    }
  };

  // Format the month name properly
  const formatBulan = (bulan: string): string => {
    if (!bulan) return "N/A";
    return bulan.charAt(0).toUpperCase() + bulan.slice(1).toLowerCase();
  };

  // Get validation image URL for a field
  const getValidationImageUrl = (fieldKey: string): string | null => {
    if (!draft) return null;
    const imageField = getImageFieldName(fieldKey);
    return imageField ? (draft[imageField] as string) || null : null;
  };

  if (loading) {
    return (
      <div className="min-h-screen p-6 flex justify-center items-center">
        <Loader2 className="animate-spin text-green-700" size={40} />
      </div>
    );
  }

  if (sendSuccess) {
    return (
      <div className="min-h-screen p-6">
        <div className="bg-green-100 p-8 rounded-lg text-center">
          <div className="flex justify-center mb-4">
            <Send className="text-green-600" size={48} />
          </div>
          <h2 className="text-2xl font-bold text-green-700 mb-4">
            Draft Berhasil Dikirim!
          </h2>
          <p className="text-green-600 mb-6">
            Draft laporan telah berhasil dikirim dan akan diproses oleh
            sekretaris.
          </p>
          <Link
            to="/dashboard/draft"
            className="inline-block bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
          >
            Kembali ke Daftar Draft
          </Link>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen p-6">
        <Link
          to="/dashboard/draft"
          className="flex items-center text-green-600 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Kembali ke Daftar Draft
        </Link>

        <div className="bg-red-100 p-6 rounded-lg text-red-700">
          <p className="font-medium">{error}</p>
        </div>
      </div>
    );
  }

  if (!draft) {
    return (
      <div className="min-h-screen p-6">
        <Link
          to="/dashboard/draft"
          className="flex items-center text-green-600 mb-8"
        >
          <ArrowLeft className="mr-2" size={20} />
          Kembali ke Daftar Draft
        </Link>

        <div className="bg-yellow-100 p-6 rounded-lg text-yellow-700">
          <p>Draft tidak ditemukan.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <Toaster position="top-center" reverseOrder={false} />

      <div className="flex justify-between items-center mb-8">
        <Link
          to="/dashboard/draft"
          className="flex items-center text-green-600"
        >
          <ArrowLeft className="mr-2" size={20} />
          Kembali ke Daftar Draft
        </Link>

        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            id="acknowledgement"
            checked={acknowledged}
            onChange={handleAcknowledgementChange}
            className="mr-2"
          />
          <label htmlFor="acknowledgement" className="text-gray-700">
            Saya menyatakan bahwa Ketua Jemaat sudah mengetahui laporan ini
          </label>
        </div>

        <button
          onClick={handleSendDraft}
          disabled={sending || !acknowledged}
          className="flex items-center bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {sending ? (
            <>
              <Loader2 className="animate-spin mr-2" size={18} />
              Mengirim...
            </>
          ) : (
            <>
              <Send className="mr-2" size={18} />
              Kirim Draft
            </>
          )}
        </button>
      </div>

      <div className="bg-green-100 p-4 rounded-lg mb-8">
        <div className="flex justify-between">
          <div>
            <h1 className="text-xl font-bold text-green-800">
              Draft Laporan Bulan {formatBulan(draft.bulan)} {draft.tahun}
            </h1>
            <p className="text-green-700">Dibuat oleh: {draft.username}</p>
          </div>
          <div className="text-green-700">ID: {draft.id}</div>
        </div>
      </div>

      {/* Required field validation summary */}
      <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0">
            <svg
              className="h-5 w-5 text-yellow-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="ml-3">
            <p className="text-sm text-yellow-700">
              Pastikan semua field yang wajib divalidasi sudah terisi nilai dan
              memiliki bukti foto. Field wajib meliputi:
            </p>
            <ul className="mt-2 text-sm text-yellow-700 list-disc pl-5">
              <li>Perlawatan Jemaat</li>
              <li>Perlawatan Non SDA</li>
              <li>Perlawatan Pendeta</li>
              <li>Baptisan Bulan Ini</li>
              <li>Komite Jemaat</li>
            </ul>
          </div>
        </div>
      </div>

      <div className="bg-white shadow-lg rounded-lg">
        <div className="bg-green-800 text-white p-4">
          <h2 className="text-xl font-bold">Laporan Bulanan Kependetaan</h2>
        </div>

        <table className="w-full border-collapse border">
          <thead>
            <tr className="bg-green-800 text-white">
              <th className="p-3 border">No</th>
              <th className="p-3 border">Items</th>
              <th className="p-3 border">Jumlah</th>
              <th className="p-3 border">Validasi</th>
            </tr>
          </thead>
          <tbody>
            {formStructure.map((row, index) => {
              // Skip the year since it's already shown in the header
              if (row.key === "tahun") return null;

              return (
                <Fragment key={`row-${index}`}>
                  {row.category && (
                    <tr className="bg-gray-200 font-bold">
                      <td className="p-3 border">{index}</td>
                      <td className="p-3 border" colSpan={3}>
                        {row.category}
                      </td>
                    </tr>
                  )}
                  {(row.items || [row]).map((item, subIndex) => {
                    if (!item.key) return null;

                    const isValidated = validationStatus[item.key];
                    const validationImageUrl = getValidationImageUrl(item.key);

                    return (
                      <tr key={`item-${item.key}`} className="border">
                        <td className="p-3 border">
                          {row.category ? `${index}.${subIndex + 1}` : index}
                        </td>
                        <td className="p-3 border">{item.label}</td>
                        <td className="p-3 border">
                          {item.key === "bulan" ? (
                            <select
                              name="bulan"
                              value={formData.bulan || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border"
                              disabled
                            >
                              <option value={formData.bulan}>
                                {formatBulan(formData.bulan)}
                              </option>
                            </select>
                          ) : item.key === "jemaat" ||
                            item.key === "wilayah" ||
                            item.key === "ketuaJemaatName" ? (
                            // Text input for string fields
                            <input
                              type="text"
                              name={item.key}
                              value={formData[item.key] || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border"
                            />
                          ) : (
                            // Number input for numeric fields
                            <input
                              type="number"
                              name={item.key}
                              value={formData[item.key] || ""}
                              onChange={handleInputChange}
                              className="w-full p-2 border"
                            />
                          )}

                          {item.validate && (
                            <input
                              type="file"
                              onChange={(e) => handleFileChange(e, item.key)}
                              className="mt-2 w-full p-2 border"
                            />
                          )}
                        </td>
                        <td className="p-3 border">
                          {item.validate ? (
                            <div>
                              <button
                                onClick={() =>
                                  handleValidation(item.id!, item.key)
                                }
                                disabled={validating[item.key]}
                                className={`${
                                  isValidated
                                    ? "bg-green-500 hover:bg-green-600"
                                    : (!categoryMapping[item.id!]?.optional &&
                                        "bg-yellow-500 hover:bg-yellow-600") ||
                                      "bg-blue-500 hover:bg-blue-600"
                                } text-white px-4 py-2 rounded transition-colors disabled:bg-gray-400`}
                              >
                                {validating[item.key] ? (
                                  <span className="flex items-center">
                                    <Loader2
                                      className="animate-spin mr-2"
                                      size={16}
                                    />
                                    Validasi...
                                  </span>
                                ) : isValidated ? (
                                  <span className="flex items-center">
                                    <CheckCircle className="mr-2" size={16} />
                                    Tervalidasi
                                  </span>
                                ) : !categoryMapping[item.id!]?.optional ? (
                                  <span className="flex items-center">
                                    <svg
                                      xmlns="http://www.w3.org/2000/svg"
                                      width="16"
                                      height="16"
                                      viewBox="0 0 24 24"
                                      fill="none"
                                      stroke="currentColor"
                                      strokeWidth="2"
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      className="mr-2"
                                    >
                                      <circle cx="12" cy="12" r="10" />
                                      <line x1="12" y1="8" x2="12" y2="12" />
                                      <line
                                        x1="12"
                                        y1="16"
                                        x2="12.01"
                                        y2="16"
                                      />
                                    </svg>
                                    Wajib Validasi
                                  </span>
                                ) : (
                                  "Validasi"
                                )}
                              </button>

                              {isValidated && validationImageUrl && (
                                <div className="mt-2">
                                  <a
                                    href={validationImageUrl}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-blue-600 underline block mt-1"
                                  >
                                    Lihat Gambar
                                  </a>
                                </div>
                              )}
                            </div>
                          ) : (
                            <span>-</span>
                          )}
                        </td>
                      </tr>
                    );
                  })}
                </Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DraftDetailPage;
