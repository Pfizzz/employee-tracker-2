INSERT INTO department(name)
VALUES 
    ('Sales'),
    ('Engineering'),
    ('Finance'),
    ('Legal');

INSERT INTO employee_role(title, salary, department_id)
VALUES
    ('Sales Lead', 50000, 1),
    ('Salesperson', 40000, 2),
    ('Lead Engineer', 70000, 3),
    ('Software Engineer', 60000, 4),
    ('Account Manager', 45000, 5),
    ('Accountant', 55000, 6),
    ('Legal Team Lead', 75000, 7);

INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES
    ('Sally', 'Blue', 4, 2),
    ('Michael', 'Pfister', 3, 4),
    ('Donna', 'Grey', 6, 2),
    ('Steven', 'Yellow', 1, 1),
    ('Ursula', 'Pink', 5, 1),
    ('Lindsay', 'White', 3, 2),
    ('Frank', 'Black', 6, 2);