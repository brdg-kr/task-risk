# Work Values

* [Excel](/dictionary/30.1/excel/work_values.html)
* [Text](/dictionary/30.1/text/work_values.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/work_values.html)
* [Oracle](/dictionary/30.1/oracle/work_values.html)

| **Purpose:** | Provide a mapping of O*NET-SOC codes (occupations) to Work Values ratings. |
| **Table Name:** | work_values |
| **Download:** | [22_work_values.sql](/dl_files/database/db_30_1_mysql/22_work_values.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| element_id | Character Varying(20) | Content Model Outline Position *(see [*Content Model Reference*](content_model_reference.html "Content Model Reference"))* |
| scale_id | Character Varying(3) | Scale ID *(see [*Scales Reference*](scales_reference.html "Scales Reference"))* |
| data_value | Decimal(5,2) | Rating associated with the O*NET-SOC occupation |
| date_updated | Date | Date when data was updated |
| domain_source | Character Varying(30) | Source of the data |

*No longer updated or displayed in O*NET websites*

This file contains the Content Model Work Values data associated with each O*NET- SOC occupation. The column named Data Value provides both the mean extent rating (indicated by the value EX in the Scale ID column) and the top three high-point values for respondents endorsing each occupation (indicated by VH in the Scale ID Column).

The high-point values represent the following elements:

|   | 0.00 = No high point available |   |
|---|---|---|
|   | 1.00 = Achievement |   |
|   | 2.00 = Working Conditions |   |
|   | 3.00 = Recognition |   |
|   | 4.00 = Relationships |   |
|   | 5.00 = Support |   |
|   | 6.00 = Independence |   |

The file is displayed in six tab delimited fields with the columns named O*NET-SOC Code, Element ID, Scale ID, Data Value, Date, and Domain Source. The six fields are represented by one row. There are a total of 7,866 rows of data in this file.

For more information, see:
* [Second Generation Occupational Value Profiles for the O*NET System: Summary](https://www.onetcenter.org/reports/SecondOVP_Summary.html)
* [Occupational Value Profiles for New and Emerging Occupations in the O*NET System: Summary](https://www.onetcenter.org/reports/OVP_NewEmerging.html)

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.0 | Date and Source columns added |
| 5.1 - 30.1 | No structure changes |

### Data Example - work_values:

| onetsoc_code | element_id | scale_id | data_value | date_updated | domain_source |
| --- | --- | --- | --- | --- | --- |
| 19-3033.00 | 1.B.2.a | EX | 5.83 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.b | EX | 5.75 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.c | EX | 5.33 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.d | EX | 6.83 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.e | EX | 3.17 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.f | EX | 6.00 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.g | VH | 4.00 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.h | VH | 6.00 | 2020-11-01 | Analyst - Transition |
| 19-3033.00 | 1.B.2.i | VH | 1.00 | 2020-11-01 | Analyst - Transition |