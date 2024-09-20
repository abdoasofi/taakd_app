import { createListResource } from 'frappe-ui'

export let location = createListResource({
    type: 'list',
    doctype: 'Location',
    fields:["location_name","parent_location","location_type"],
    cache: 'location',
    auto: true,
    onSuccess() {
        console.log("********ssss****",location.data )
    },
    // transform(data) {
    //   return data.map((location) => {
    //     return {
    //       ...location,
    //       route: {
    //         name: 'Location',
    //         params: { locationId: location.location_name },
    //       },
    //       open: false,
    //     //   projects: [],
    //     }
    //   })
    // },
  })

export let activeLcation = computed(() => {
    return location.data 
  })  
// let locationsByName = reactive({})
// export let locations = createResource({
//     url: 'taakd_app.api.get_loction',
//     cache: 'Location',
//     initialData: [],
//     auto:true,
//     transform(locations) {
//         // console.log("*************",locations)
//       for (let loc of locations) {
//         // console.log("*************",loc.location_name)
//         locationsByName[loc.location_name] = loc
 
//       }
//     //   console.log("*************",locationsByName)
      
//       return locations
//     },
//     onError(error) {
//       if (error && error.exc_type === 'AuthenticationError') {
//         router.push('/login')
//       }
//     }, 
//   })