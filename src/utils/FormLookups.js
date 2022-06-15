import { GetDynamicsToken } from "./DynamicsAuth";

export const GetLookupValues = async () => {
    const token = await GetDynamicsToken()

    var myHeaders = new Headers();
    myHeaders.append("Authorization", `Bearer ${token}`);

    var requestOptions = {
        method: 'GET',
        headers: myHeaders,
        redirect: 'follow'
    };

    try {
        const response = await fetch(`http://localhost:5000/api/hs/events/lookups`, requestOptions)
        // const response = await fetch(`http://localhost:5000/api/hs/events/lookups`, requestOptions)
        const result = await response.json()

        const categories = []
        categories.push({ key: 'Please select an option', value: ''})
        result.categories.value.map(c => categories.push({ key: c.pobl_accidentcategoryname, value: c.pobl_accidentcategoryid}))

        const injuries = []
        injuries.push({ key: 'Please select an option', value: ''})
        result.injuries.value.map(c => injuries.push({ key: c.pobl_injurysustainedname, value: c.pobl_injurysustainedid}))

        const injuryParts = []
        injuryParts.push({ key: '', value: ''})
        result.injuryParts.value.map(c => injuryParts.push({ key: c.pobl_injuredpartname, value: c.pobl_injuredpartid}))

        const employees = []
        employees.push({ key: '', value: ''})
        result.employees.value.map(e => employees.push({ key: e.pobl_employeename, value: e.pobl_employeehsid}))

        const witnessTypes = []
        witnessTypes.push({ key: '', value: ''})
        result.witnessTypes.map(e => witnessTypes.push({ key: e.witnessTypeName, value: e.witnessTypeId.toString()}))

        const emergencyServices = []
        emergencyServices.push({ key: '', value: ''})
        result.emergencyServices.map(e => emergencyServices.push({ key: e.emergencyServiceName, value: e.emergencyServiceId.toString()}))

        return {
            categories,
            injuries,
            injuryParts,
            employees,
            witnessTypes,
            emergencyServices
        }
    } catch (error) {
        console.log('Error', error)
    }
}