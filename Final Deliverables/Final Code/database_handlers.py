import ibm_db_dbi as db


print('[CONNECTING]')
conn = db.connect("DATABASE=db_name;"
                      "HOSTNAME=host_name;"
                      "PORT=port;"
                      "PROTOCOL=pcol;"
                      "SECURITY=sec;"
                      "SSLServerCertificate=DigiCertGlobalRootCA.crt;"
                      "UID=user_id;"
                      "PWD=password;", '', '')

print('[CONNECTED]')


def create_account(fullName, username, email, password, mobileNumber):

    cursor = conn.cursor()
    SQL = f"INSERT INTO users VALUES(?, ?, ?, ?, ?, NULL)"
    cursor.execute(SQL, [fullName, username, email, password, mobileNumber])
    print('[INSERTED]')
    cursor.close()
    conn.commit()


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



'''
def view_all_entries():
    execute_generic_query('SELECT * FROM users')


def view_names():
    execute_generic_query('SELECT name FROM users')


def view_usernames():
    execute_generic_query('SELECT username FROM users')


def view_passwords():
    execute_generic_query('SELECT password FROM users')


def view_emails():
    execute_generic_query('SELECT email FROM users')


def view_mobiles():
    execute_generic_query('SELECT mobile FROM users')


def view_table_layout():
    # You cannot describe a table for some reason.
    return

    # Useless junk below
    cursor = conn.cursor()
    cursor.execute("SELECT * FROM SYSIBM.COLUMNS WHERE TABLE_NAME = 'users'")
    rows = cursor.fetchall()
    for row in rows:
        print(row)
    cursor.close()
'''

def main():
    # view_all_entries()
    # view_table_layout()
    '''
    functions = [
        view_names,
        view_usernames,
        view_emails,
        view_passwords,
        view_mobiles
        ]

    for function in functions:
        print('*'*15)
        function()
    '''

    print('[EXIT-MAIN]')


if __name__ == '__main__':
    main()
