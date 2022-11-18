import ibm_db_dbi
import ibm_db_dbi as db


def execute_generic_query(sql, *params):
    # return type is: [(1, 2, 3), (4, 5, 6), (7, 8, 9)]
    cursor = conn.cursor()
    if params:
        cursor.execute(sql, params)
    else:
        cursor.execute(sql)
    conn.commit()

    try:
        rows = cursor.fetchall()
    except db.ProgrammingError:
        rows = None
    else:
        if not rows:
            print('Nothing returned by the query')
        else:
            for row in rows:
                print(row)
    finally:
        cursor.close()

    return rows


def create_table():
    SQL = '''create table users (
                    name varchar(30),
                    username varchar(15) not null unique,
                    email varchar(35) not null unique,
                    password varchar(100),
                    mobile varchar(12),
                    contents clob
                                );'''

    try:
        execute_generic_query(SQL)
    except ibm_db_dbi.ProgrammingError as exception:
        print(exception)
        print('The table exists already')


print('[CONNECTING]')
conn = db.connect("DATABASE=bludb;"
                      "HOSTNAME=0c77d6f2-5da9-48a9-81f8-86b520b87518.bs2io90l08kqb1od8lcg.databases.appdomain.cloud;"
                      "PORT=31198;"
                      "PROTOCOL=TCPIP;"
                      "SECURITY=SSL;"
                      "SSLServerCertificate=DigiCertGlobalRootCA.crt;"
                      "UID=rwf19214;"
                      "PWD=N7tcvzquirvaYxzW;", '', '')

create_table()
print('[CONNECTED]')


def create_account(fullName, username, email, password, mobileNumber):

    cursor = conn.cursor()
    SQL = f"INSERT INTO users VALUES(?, ?, ?, ?, ?, NULL)"
    cursor.execute(SQL, [fullName, username, email, password, mobileNumber])
    print('[INSERTED]')
    cursor.close()
    conn.commit()




def check_username_existence(value):
    SQL = f'SELECT password FROM users WHERE username LIKE \'{value}\''
    result = execute_generic_query(SQL)
    print(result)
    if not result:
        return False
    return True


def check_email_existence(value):
    SQL = f'SELECT password FROM users WHERE email LIKE \'{value}\''
    result = execute_generic_query(SQL)
    print(result)
    if not result:
        return False
    return True


def fetch_password(username):
    SQL = f'SELECT password FROM users WHERE username like \'{username}\''
    password = execute_generic_query(SQL)
    print(password)
    if not password:
        return password
    return password[0][0]


def fetch_table_contents(username):
    SQL = f'SELECT contents FROM users WHERE username = \'{username}\''
    tableContents = execute_generic_query(SQL)
    print('table contents are', tableContents)
    return tableContents


def add_details_to_db(username, details):
    SQL = f'UPDATE users SET contents = \'{details}\' WHERE username = \'{username}\''
    execute_generic_query(SQL)



def main():
    print('[EXIT-MAIN]')


if __name__ == '__main__':
    main()
