import { BaseModel } from './base';

export class User extends BaseModel {

  /**
   * Attributes that can be filled
   * @return {Array} Array of attributes
   */
  get fillables() {

    return ['id', 'userId', 'userType', 'contactName',
      'contactPerson', 'contactWay', 'createTime', 'createUserId',
      'creditCode', 'updateTime', 'updateUserId', 'townId', 'companyId'
    ];

  }

  /**
   * Constructor
   */
  constructor() {

    super();

  }

  /**
   * See parent <static create()>
   */
  static create(data) {

    let user = new User;

    return user.fill(data);

  }

  /**
   * Get name of this user
   * @return {String} 
   */
  get name() {

    let fname = this.getAttr('first_name');
    let lname = this.getAttr('last_name');

    if (fname && lname) {
      return this.getAttr('first_name') + ' ' + this.getAttr('last_name')
    }

    return "Dear User"

  }

}