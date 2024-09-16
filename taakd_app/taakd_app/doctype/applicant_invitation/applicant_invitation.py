# Copyright (c) 2024, Asofi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ApplicantInvitation(Document):
	
	def before_save(self):
		self.add_company_information()
	
	def on_submit(self):
		self.create_user()
		self.create_verification_instructions_request()
		self.create_sales_invoice()

	def on_cancel(self):
		pass	

	def add_full_name(self):
		middle_name = self.middle_name
		if self.middle_name == None: 
			middle_name = ""
		self.full_name = f"{self.first_name} {middle_name} {self.last_name}"  

	def add_company_information(self):
		user = frappe.get_doc("User", frappe.session.user)
		self.db_set("company_name",user.full_name)
		if user.full_name == "Administrator":
			self.db_set("company_email","administrator") 
		else :
			self.db_set("company_email",user.email)

	def create_user(self):
		if frappe.db.exists("User", {"email":self.email}):
			return True 
		else:
			new_doc = frappe.new_doc("User")
			new_doc.email = self.email
			new_doc.first_name = self.first_name
			new_doc.last_name = self.last_name
			new_doc.middle_name = self.middle_name
			new_doc.enabled = True
			new_doc.language = self.language
			new_doc.module_profile = ""
			new_doc.role_profile_name = "Applicant"
			new_doc.insert()
			return new_doc      

	def create_verification_instructions_request(self):
		new_doc = frappe.new_doc("Verification Instructions Request")
		new_doc.payd_from = self.payd_from
		new_doc.user_id = self.email
		new_doc.company_submitting_application = self.company_email
		new_doc.language = self.language
		new_doc.insert()
		return new_doc  

	def create_sales_invoice(self):
			sales_invoice = frappe.get_doc(
				{
					"doctype": "Sales Invoice",
					"customer": "Asofi Company",
				}
			)
			self.preparing_the_sales_invoice(self.other_services, sales_invoice)
			sales_invoice.save()
			sales_invoice.submit()
	

	def preparing_the_sales_invoice(self, list_items, sales_invoice):
		for i in list_items:
			is_stock_item = frappe.get_value("Item", i.service, "is_stock_item")
			if is_stock_item:
				sales_invoice.append(
					"items",
					{
						"item_code": i.service,
						"qty": 1,
						"uom":"Nos",
					},
				)
			elif bundle := frappe.db.exists("Product Bundle", {"new_item_code": i.service}):
				self.preparing(bundle, sales_invoice)
		if self.package:
			self.preparing(self.package, sales_invoice)   

	def preparing(self, bundle, sales_invoice):
		bundle = frappe.get_doc("Product Bundle", bundle)
		for b_i in bundle.items:
			sales_invoice.append(
				"items",
				{
					"item_code": b_i.item_code,
					"qty": 1,
					"uom":"Nos",
				},
			)