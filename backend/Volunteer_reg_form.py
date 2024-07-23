import csv


def add_json_entry_to_csv(entry, csvreader):
    # Load the CSV file
    with open(csvreader, 'r', newline='') as csvfile:
        reader = csv.reader(csvfile)
        data = list(reader)

    # Convert the JSON data to a list
    json_list = [entry.values()]

    # Add the new data to the CSV data
    data.extend(json_list)

    # Write the updated data to the CSV file
    with open(csvreader, 'w', newline='') as csvfile:
        writer = csv.writer(csvfile)
        writer.writerows(data)


# Example usage:
entry = {'name': 'anil', 'age': 30, 'occupation': 'Developer'}
csv_file = 'example.csv'
add_json_entry_to_csv(entry, csv_file)

# def register_for_event(username, email, address, area_of_interest, phone_number):
#     return {'username': username, 'email': email, 'address': address, 'area_of_interest': area_of_interest,
#             'phone_number': phone_number}

# print(register_for_event('vinay', 'vina@mail.com', 'india', 'blood donation', '987456321'))
