import frappe

@frappe.whitelist(allow_guest=True)
def fetch_verification_request(user_id):
   request= frappe.db.get_list('Verification Instructions Request',
    filters={
         'user_id': user_id 
    },
    fields=['*'],
    page_length=1,
    as_list=True
    )
   return request
   
   
def update_request(request):
    pass
  