import frappe


@frappe.whitelist(allow_guest=True)
def get_loction():
    location_list = frappe.qb.get_query(
        "Location",
        filters={},
        fields=["location_name","parent_location","location_type"],
    ).run(as_dict=1) 
    print("*********************",location_list)
    return location_list  