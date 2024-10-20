# Copyright (c) 2024, Asofi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document

import os
from io import BytesIO
from urllib.parse import unquote
import requests
from frappe.core.doctype.file.file import get_local_image
from frappe.core.doctype.file.utils import delete_file
from PIL import Image

class VerificationInstructionsRequest(Document):
	
	def before_save(self):
		self.add_full_name()
		# print("*"*50,self.other_languages,"*")
		# self.electronic_signature ="data:image/png;base64,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"
	def add_full_name(self):
		middle_name = self.middle_name
		if self.middle_name == None: 
			middle_name = ""
		self.full_name = f"{self.first_name} {middle_name} {self.last_name}"  

@frappe.whitelist()
def upload_builder_asset():
	from frappe.handler import upload_file

	image_file = upload_file()
	if image_file.file_url.endswith((".png", ".jpeg", ".jpg")) and frappe.get_cached_value(
		"Builder Settings", None, "auto_convert_images_to_webp"
	):
		convert_to_webp(file_doc=image_file)
	return image_file

@frappe.whitelist()
def convert_to_webp(image_url: str | None = None, file_doc: Document | None = None) -> str:
	"""BETA: Convert image to webp format"""

	CONVERTIBLE_IMAGE_EXTENSIONS = ["png", "jpeg", "jpg"]

	def can_convert_image(extn):
		return extn.lower() in CONVERTIBLE_IMAGE_EXTENSIONS

	def get_extension(filename):
		return filename.split(".")[-1].lower()

	def convert_and_save_image(image, path):
		image.save(path, "WEBP")
		return path

	def update_file_doc_with_webp(file_doc, image, extn):
		webp_path = file_doc.get_full_path().replace(extn, "webp")
		convert_and_save_image(image, webp_path)
		delete_file(file_doc.get_full_path())
		file_doc.file_url = f"{file_doc.file_url.replace(extn, 'webp')}"
		file_doc.save()
		return file_doc.file_url

	def create_new_webp_file_doc(file_url, image, extn):
		files = frappe.get_all("File", filters={"file_url": file_url}, fields=["name"], limit=1)
		if files:
			_file = frappe.get_doc("File", files[0].name)
			webp_path = _file.get_full_path().replace(extn, "webp")
			convert_and_save_image(image, webp_path)
			new_file = frappe.copy_doc(_file)
			new_file.file_name = f"{_file.file_name.replace(extn, 'webp')}"
			new_file.file_url = f"{_file.file_url.replace(extn, 'webp')}"
			new_file.save()
			return new_file.file_url
		return file_url

	def handle_image_from_url(image_url):
		image_url = unquote(image_url)
		response = requests.get(image_url)
		image = Image.open(BytesIO(response.content))
		filename = image_url.split("/")[-1]
		extn = get_extension(filename)
		if can_convert_image(extn):
			_file = frappe.get_doc(
				{
					"doctype": "File",
					"file_name": f"{filename.replace(extn, 'webp')}",
					"file_url": f"/files/{filename.replace(extn, 'webp')}",
				}
			)
			webp_path = _file.get_full_path()
			convert_and_save_image(image, webp_path)
			_file.save()
			return _file.file_url
		return image_url

	if not image_url and not file_doc:
		return ""

	if file_doc:
		if file_doc.file_url.startswith("/files"):
			image, filename, extn = get_local_image(file_doc.file_url)
			if can_convert_image(extn):
				return update_file_doc_with_webp(file_doc, image, extn)
		return file_doc.file_url

	if image_url.startswith("/files"):
		image, filename, extn = get_local_image(image_url)
		if can_convert_image(extn):
			return create_new_webp_file_doc(image_url, image, extn)
		return image_url

	if image_url.startswith("/builder_assets"):
		image_path = os.path.abspath(frappe.get_app_path("builder", "www", image_url.lstrip("/")))
		image_path = image_path.replace("_", "-")
		image_path = image_path.replace("/builder-assets", "/builder_assets")

		image = Image.open(image_path)
		extn = get_extension(image_path)
		if can_convert_image(extn):
			webp_path = image_path.replace(extn, "webp")
			convert_and_save_image(image, webp_path)
			return image_url.replace(extn, "webp")
		return image_url

	if image_url.startswith("http"):
		return handle_image_from_url(image_url)

	return image_url