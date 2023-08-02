 
class User {
  static count = 0;
  constructor(username, email, password) {
    this.username = username;
    this.email = email;
    this.password = password;
    User.count++;
  }
  printNumberOfUsers() {
    console.log("currentnumberofusers =", User.count);
  }
}

class Member extends User {
  constructor(username, email, password) {
    super(username, email, password);
    this.membershipactivetilldate = new Date(2023, 2, 3); // Assume the user has joined your platform on 3rd March
    this.package = '';
  }

  purchaseMembership(membershippackagename) {
    if (membershippackagename === "MONTHLYPACKAGE") {
      this.membershipactivetilldate.setMonth(
        this.membershipactivetilldate.getMonth() + 1
      );
    } else if (membershippackagename === "YEARLYPACKAGE") {
      this.membershipactivetilldate.setFullYear(
        this.membershipactivetilldate.getFullYear() + 1
      );
    }

    this.package = membershippackagename;
  }

  subscriptionActiveTill() {
    console.log(
      this.username +
        " is subscribed to " +
        this.package +
        " uptill " +
        this.membershipactivetilldate.toDateString()
    );
  }
}

function createNewStudents(username, email, password, membershippackagename) {
  const member = new Member(username, email, password);
  member.purchaseMembership(membershippackagename);
  member.subscriptionActiveTill();
}

async function readInput() {
  let inputString = '';
  var output = [];
  process.stdin.on('data', (inputStdin) => {
    inputString += inputStdin;
  });

  process.stdin.on('end', () => {
    const inputArr = inputString.trim().split(/(?:\r\n|\r|\n)/g);
    const argumentsArr = inputArr[0].split(',');
    createNewStudents(argumentsArr[0], argumentsArr[1], argumentsArr[2], argumentsArr[3]);
    process.exit();
  });
}

readInput();
