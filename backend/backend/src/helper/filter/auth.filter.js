function getAllUsersFilter(request){
    let filter = {}
    if (request.query.email) filter.email = request.query.email.split(",");

    if (request.query.gender)
      filter.gender = request.query.gender;

  
    return filter;
}

export {getAllUsersFilter}