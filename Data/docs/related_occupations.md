# Related Occupations

* [Excel](/dictionary/30.1/excel/related_occupations.html)
* [Text](/dictionary/30.1/text/related_occupations.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/related_occupations.html)
* [Oracle](/dictionary/30.1/oracle/related_occupations.html)

| **Purpose:** | Provide related occupation links between O*NET-SOC occupations. |
| **Table Name:** | related_occupations |
| **Download:** | [27_related_occupations.sql](/dl_files/database/db_30_1_mysql/27_related_occupations.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| related_onetsoc_code | Character(10) | Related O*NET-SOC code mapping *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| relatedness_tier | Character Varying(50) | Categories indicating level of relatedness |
| related_index | Decimal(3,0) | Order of related code mappings based on expert review |

For each O*NET-SOC code included, 10 primary and 10 supplemental related O*NET-SOC codes are listed. The related occupations in this file are developed using an approach which includes three important contributors to occupational similarity: what people in the occupations do, what they know, and what they are called. The “Relatedness Tier” column assigns one of three categories to each link:
* **Primary-Short** — Five most strongly related occupations after expert review.
* **Primary-Long** — 6th to 10th most strongly related occupations after expert review.
* **Supplemental** — 11th to 20th most strongly related occupations after expert review.

The file is displayed in four tab delimited fields with the columns named O*NET-SOC Code, Related O*NET-SOC Code, Relatedness Tier, and Index. The four fields are represented by one row. There are a total of 18,460 rows of data in this file.

For more information, see:
* [Developing Related Occupations for the O*NET Program](https://www.onetcenter.org/reports/Related_2022.html)
* [Updates to Related Occupations for the O*NET Program Using the O*NET 28.0 Database](https://www.onetcenter.org/reports/Related_2024.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 26.3 | Added as a new file |
| 27.0 - 30.1 | No structure changes |

### Data Example - related_occupations:

| onetsoc_code | related_onetsoc_code | relatedness_tier | related_index |
| --- | --- | --- | --- |
| 17-1011.00 | 17-1012.00 | Primary-Short | 1 |
| 17-1011.00 | 11-9021.00 | Primary-Short | 2 |
| 17-1011.00 | 27-1025.00 | Primary-Short | 3 |
| 17-1011.00 | 17-2051.00 | Primary-Short | 4 |
| 17-1011.00 | 47-4011.00 | Primary-Short | 5 |
| 17-1011.00 | 11-9041.00 | Primary-Long | 6 |
| 17-1011.00 | 17-2112.00 | Primary-Long | 7 |