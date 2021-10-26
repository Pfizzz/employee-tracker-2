INSERT INTO department(name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO role(title, salary, department_id)
VALUES
    ("Sales Lead", 50000, 1),
    ("Salesperson", 40000, 1),
    ("Lead Engineer", 70000, 2),
    ("Software Engineer", 60000, 2),
    ("Account Manager", 45000, 3),
    ("Accountant", 55000, 3),
    ("Legal Team Lead", 75000, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ("Sally", "Blue", 1, null),
    ("Michael", "Pfister", 2, 1),
    ("Donna", "Grey", 6, null),
    ("Steven", "Yellow", 1, 2),
    ("Ursula", "Pink", 5, null),
    ("Lindsay", "White", 3, null),
    ("Frank", "Black", 7, null),
    ("Gary", "Busey", 6, 1);