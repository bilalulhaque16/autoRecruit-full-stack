function getAllCompaniesFilter(request){
    let filter = {}
    if (request.query.company_name) filter.company_name = request.query.company_name.split(",");

    if (request.query.establishment_date) {
        const date_range = request.query.establishment_date.split("-");
        const start_date = date_range[0];
        const end_date = date_range[1];
        filter.establishment_date = { $gt: start_date, $lt: end_date };
    }

    return filter
}

export {getAllCompaniesFilter};