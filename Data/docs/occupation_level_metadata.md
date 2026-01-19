# Occupation Level Metadata

* [Excel](/dictionary/30.1/excel/occupation_level_metadata.html)
* [Text](/dictionary/30.1/text/occupation_level_metadata.html)
* [MySQL](#)
* [SQL Server](/dictionary/30.1/mssql/occupation_level_metadata.html)
* [Oracle](/dictionary/30.1/oracle/occupation_level_metadata.html)

| **Purpose:** | Provide O*NET-SOC Occupational Level Metadata associated with the incumbent data collection. |
| **Table Name:** | occupation_level_metadata |
| **Download:** | [07_occupation_level_metadata.sql](/dl_files/database/db_30_1_mysql/07_occupation_level_metadata.sql) |

### Structure and Description:

| Column | Type | Column Content |
| --- | --- | --- |
| onetsoc_code | Character(10) | O*NET-SOC Code *(see [*Occupation Data*](occupation_data.html "Occupation Data"))* |
| item | Character Varying(150) | Occupation level statistics |
| response | Character Varying(75) | Type of response |
| n | Decimal(4,0) | Sample size for occupation |
| percent | Decimal(4,1) | Percentage of responses |
| date_updated | Date | Date when data was updated |

This file contains occupational level metadata variables associated with data collection statistics. Refer to **[Appendix 3, *Key to Occupation Level Metadata*](appendix_metadata.html "Appendix 3. Key to Occupation Level Metadata")** for additional descriptions of the data provided in this file.

The file is displayed in six tab delimited fields with the columns named O*NET-SOC Code, Item, Response, N, Percent, and Date. The six fields are represented by one row. There are a total of 32,202 rows of data in this file.

### File Structure Changes:

| Release Number | Description of Change |
| --- | --- |
| 5.1 | Added as a new file |
| 6.0 - 20.3 | No structure changes |
| 21.0 | Items added and renamed; see [Appendix 3, *Key to Occupation Level Metadata*](appendix_metadata.html "Appendix 3. Key to Occupation Level Metadata") |
| 21.1 - 30.1 | No structure changes |

### Data Example - occupation_level_metadata:

| onetsoc_code | item | response | n | percent | date_updated |
| --- | --- | --- | --- | --- | --- |
| 17-2111.02 | Data Collection Mode | Paper | 26 | 15.4 | 2025-08-01 |
| 17-2111.02 | Data Collection Mode | Web | 26 | 84.6 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | 1-2 Years | 26 | 0.0 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | 10+ Years | 26 | 96.2 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | 3-4 Years | 26 | 0.0 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | 5-9 Years | 26 | 3.8 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | <1 Year | 26 | 0.0 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | Missing | 26 | 0.0 | 2025-08-01 |
| 17-2111.02 | How Much Experience Performing Work in this Occupation | Never performed work in the occupation | 26 | 0.0 | 2025-08-01 |
| 17-2111.02 | OE Completeness Rate | NULL | NULL | 100.0 | 2025-08-01 |
| 17-2111.02 | OE Response Rate | NULL | NULL | 50.0 | 2025-08-01 |
| 17-2111.02 | Total Completed Questionnaires | NULL | 26 | NULL | 2025-08-01 |
| 17-2112.00 | Data Collection Mode | Paper | 84 | 42.9 | 2020-08-01 |
| 17-2112.00 | Data Collection Mode | Web | 84 | 57.1 | 2020-08-01 |
| 17-2112.00 | Employee Completeness Rate | NULL | NULL | 90.3 | 2020-08-01 |
| 17-2112.00 | Employee Response Rate | NULL | NULL | 68.4 | 2020-08-01 |