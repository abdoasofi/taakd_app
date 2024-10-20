import { defineStore } from 'pinia';
import { FileUploadHandler } from "frappe-ui";
import { toast } from "vue-sonner";
interface files {
    files: Object
  }
  const getDefaultState = (): files => ({
    files:location,
  });
  export const useLocation= defineStore('files', {
    state: (): files => getDefaultState(),
  
    actions: {
		uploadFile: async (file: File) => {
			const uploader = new FileUploadHandler();
			let fileDoc = {
				file_url: "",
				file_name: "",
			};
			const upload = uploader.upload(file, {
				private: false,
				folder: "Home/Builder Uploads",
				optimize: true,
				upload_endpoint: "/api/method/taakd_app.taakd_app.doctype.verification_instructions_request.verification_instructions_request.upload_builder_asset",
			});
			await new Promise((resolve) => {
				toast.promise(upload, {
					loading: "Uploading...",
					success: (data: { file_name: string; file_url: string }) => {
						fileDoc.file_name = data.file_name;
						fileDoc.file_url = data.file_url;
						resolve(fileDoc);
						return "Uploaded";
					},
					error: () => "Failed to upload",
					duration: 500,
				});
			});

			return {
				fileURL: fileDoc.file_url,
				fileName: fileDoc.file_name,
			};
		},

    },
  });