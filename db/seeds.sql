INSERT INTO department(name)
VALUES 
    ("Sales"),
    ("Engineering"),
    ("Finance"),
    ("Legal");

INSERT INTO empRole(title, salary, department_id)
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
    ("Sally", "Blue", 2, 1),
    ("Michael", "Pfister", 1, null);
    -- ("Donna", "Grey", 6, 2),
    -- ("Steven", "Yellow", 1, 1),
    -- ("Ursula", "Pink", 5, 1),
    -- ("Lindsay", "White", 3, 2),
    -- ("Frank", "Black", 6, 2);