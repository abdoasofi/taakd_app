# Copyright (c) 2024, Asofi and contributors
# For license information, please see license.txt

import frappe
from frappe.model.document import Document


class ApplicantInvitation(Document):
	
	# def onload(self):
	# 	self.add_company_information()

	def before_save(self):
		# self.add_full_name()
		self.add_company_information()
		# print("*"*50,self.company_email)

		
	def add_full_name(self):
		# print("%"*50,self.company_email)
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
	
	
	def on_submit(self):
		self.create_user_base_on_applicant_invitation()

		self.create_vir_base_on_applicant_invitation()

	def on_cancel(self):
		pass	


	def create_user_base_on_applicant_invitation(self):
		if frappe.db.exists("User", {"email":self.email}):
			return True
		else:
			new_user = self.create_user()
   
			return new_user

	def create_vir_base_on_applicant_invitation(self):
		new_verification_instructions_request = self.create_verification_instructions_request()
		# print("*#"*5,new_verification_instructions_request)
		return new_verification_instructions_request

	def create_user(self):
			new_doc = frappe.new_doc("User")
			new_doc.email = self.email
			new_doc.first_name = self.first_name
			new_doc.last_name = self.last_name
			new_doc.middle_name = self.middle_name
			# new_doc.full_name = self.full_name
			new_doc.enabled = True
			new_doc.language = self.language
			new_doc.module_profile = ""
			new_doc.role_profile_name = "Applicant"

			new_doc.insert()
			
			return new_doc      

	def create_verification_instructions_request(self):
		# print("*-"*50,self.company_email)
		# print("*-"*50,self.email)
		new_doc = frappe.new_doc("Verification Instructions Request")
		new_doc.payd_from = self.payd_from
		# print("*-"*50,self.company_email)
		new_doc.user_id = self.email
		# print("*-"*50,self.company_email)
		new_doc.company_submitting_application = self.company_email

		new_doc.language = self.language

		new_doc.insert()
		# print("*"*50,new_doc)
		return new_doc  

