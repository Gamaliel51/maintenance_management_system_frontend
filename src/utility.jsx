export const checkAuth = () => {
    const accessToken  = sessionStorage.getItem('accessToken')
    if(!accessToken){
        return false
    }
    return true
}


export const getCategories = () => {
    const categories = {
        building_type: ['college', 'hostels'],
        college: {
            building_list: ['CST', 'CMSS', 'CEDS', 'MECH', 'CIVIL', 'PET', 'EIE'],
            categories: ['electrical', 'carpentry', 'facilities'],
            electrical: ['lights', 'sockets', 'fan', 'ac'],
            carpentry: ['benches/chairs', 'cupboards', 'door', 'windows'],
            facilities: ['smart board', 'speaker/microphone']
        },
        hostels: {
            building_list_male: ['Peter Hall', 'John Hall', 'Paul Hall', 'Joseph Hall', 'Daniel Hall'],
            building_list_female: ['Esther Hall', 'Dorcas Hall', 'Lydia Hall', 'Deborah Hall', 'Mary Hall'],
            categories: ['electrical', 'carpentry'],
            electrical: ['lights', 'sockets', 'fan'],
            carpentry: ['bunks', 'lockers', 'door', 'windows']
        }
    }

    return categories
}
