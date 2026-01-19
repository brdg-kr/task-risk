# Interests

* [Excel](/dictionary/30.1/excel/interests.html)
* [Text](/dictionary/30.1/text/interests.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/interests.html)
* [Oracle](/dictionary/30.1/oracle/interests.html)

| **Purpose:** | Provide general occupational interest (RIASEC) high-point codes and numeric profile data for each O*NET-SOC occupation. |
| **Table Name:** | interests |
| **Download:** | [13_interests.sql](/dl_files/database/db_30_1_mysql/13_interests.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

This file contains the general occupational interest (RIASEC) high-point codes and numeric profile data for each O*NET-SOC occupation. Interest ratings are presented as two scales: OI reports the RIASEC level of each interest and IH presents “high-point codes”, the numbers of the RIASEC scales for the first, second and/or third highest ratings. The high-point values represent the following elements:

|   | 0.00 = No high point available |   |
|---|---|---|
|   | 1.00 = Realistic |   |
|   | 2.00 = Investigative |   |
|   | 3.00 = Artistic |   |
|   | 4.00 = Social |   |
|   | 5.00 = Enterprising |   |
|   | 6.00 = Conventional |   |

The file is displayed in six tab delimited fields with the columns named O*NET-SOC Code, Element ID, Scale ID, Data Value, Date, and Domain Source. The six fields are represented by one row. There are a total of 8,307 rows of data in this file.

For more information, see:
* [Using Machine Learning to Develop Occupational Interest Profiles and High-Point Codes for the O*NET System](https://www.onetcenter.org/reports/ML_OIPs.html)
* [Career Returns within the O*NET Interest Profiler Tools](https://www.onetcenter.org/reports/IP_Career_Returns.html)
* [Development of an O*NET® Mini Interest Profiler (Mini-IP) for Mobile Devices: Psychometric Characteristics](https://www.onetcenter.org/reports/Mini-IP.html)
* [Examining the Efficacy of Emoji Anchors for the O*NET Interest Profiler Short Form](https://www.onetcenter.org/reports/IP_Emoji.html)
* [O*NET Interest Profiler Short Form Psychometric Characteristics: Summary](https://www.onetcenter.org/reports/IPSF_Psychometric.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 - 30.1 | No structure changes |

### Data Example - interests:

| onetsoc_code | element_id | scale_id | data_value | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- |
| 43-4041.00 | 1.B.1.a | OI | 1.00 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.b | OI | 1.85 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.c | OI | 1.00 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.d | OI | 3.39 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.e | OI | 4.47 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.f | OI | 7.00 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.g | IH | 6.00 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.h | IH | 5.00 | 2023-11-01 | Machine Learning |
| 43-4041.00 | 1.B.1.i | IH | 4.00 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.a | OI | 6.25 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.b | OI | 4.63 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.c | OI | 1.00 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.d | OI | 3.58 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.e | OI | 1.00 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.f | OI | 4.87 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.g | IH | 1.00 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.h | IH | 6.00 | 2023-11-01 | Machine Learning |
| 29-2034.00 | 1.B.1.i | IH | 2.00 | 2023-11-01 | Machine Learning |