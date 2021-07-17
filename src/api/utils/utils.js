const pool = require('./../../config/sql');


exports.insertUnits = (data, parent_id, project_id, cb) => {
    let unit_list = [];
    let unitConfig = data.tower_setup;
    let towerDetails = unitConfig.tower_details;

    towerDetails.forEach(item => {
        item.floor_setting.forEach(floor_arr => {
            for (let index = 0; index < floor_arr.flat_count; index++) {

                let no = index;
                unit_list.push([
                    parent_id,
                    project_id,
                    item.tower_number,
                    floor_arr.floor_number,
                    (`${item.tower_name}${floor_arr.floor_number}${no++}`).toString()
                ])
            }
        });
    });

    return cb(null, unit_list);
}

exports.generateBillNo = (cb) => {
    pool.query("SELECT * FROM `sales` ORDER BY id DESC LIMIT 0 , 1", (err, lastRow) => {
        if(err) {
            console.error("generateBillNo: ", err);
            return cb('Internal server error!');
        } else {
            let bill_no = lastRow[0].bill_no;

            return(null)
        }
    })
}