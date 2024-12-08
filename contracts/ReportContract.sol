// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract ReportContract {
    struct Report {
        bytes32 reportHash;
        string details;
        string publicLocation;
        string mediaCID;
        string category;
        uint256 priority;
        uint256 timestamp;
        ReportStatus status;
        address reporter;
        uint256 upvotes;
        uint256 downvotes;
        bool isSolved;
    }

    struct ReportView {
        uint256 reportId;
        bytes32 reportHash;
        string details;
        string publicLocation;
        string mediaCID;
        string category;
        uint256 priority;
        uint256 timestamp;
        ReportStatus status;
        address reporter;
        uint256 upvotes;
        uint256 downvotes;
        bool isSolved;
    }

    struct UserProfile {
        uint256 points;
        uint256 reportsSubmitted;
        uint256 successfulReports;
        uint256 lastReportTime;
    }

    enum ReportStatus { Active, Solved, Flagged }

    // State Variables
    mapping(uint256 => Report) public reports;
    mapping(address => UserProfile) public userProfiles;
    mapping(uint256 => mapping(address => bool)) public reportVotes;
    uint256 public reportCount;

    // Constants
    uint256 public constant POINTS_FOR_REPORT = 100;
    uint256 public constant POINTS_FOR_UPVOTE = 2;
    uint256 public constant POINTS_DEDUCTION_DOWNVOTE = 400;
    uint256 public constant POINTS_FOR_SOLVING = 20;
    uint256 public constant REPORT_COOLDOWN = 1 hours;

    // Events
    event ReportSubmitted(uint256 indexed reportId, address indexed reporter);
    event ReportVoted(uint256 indexed reportId, address indexed voter, bool isUpvote);
    event ReportStatusUpdated(uint256 indexed reportId, ReportStatus newStatus);
    event PointsUpdated(address indexed user, uint256 points, string reason);

    function submitReport(
        string memory _details,
        string memory _publicLocation,
        string memory _mediaCID,
        string memory _category,
        uint256 _priority
    ) external {
        require(_priority > 0 && _priority <= 5, "Invalid priority");
        require(
            block.timestamp >= userProfiles[msg.sender].lastReportTime + REPORT_COOLDOWN,
            "Report cooldown active"
        );
        
        uint256 reportId = ++reportCount;
        
        reports[reportId] = Report({
            reportHash: keccak256(abi.encodePacked(_publicLocation, _mediaCID, _category)),
            details: _details,
            publicLocation: _publicLocation,
            mediaCID: _mediaCID,
            category: _category,
            priority: _priority,
            timestamp: block.timestamp,
            status: ReportStatus.Active,
            reporter: msg.sender,
            upvotes: 0,
            downvotes: 0,
            isSolved: false
        });

        UserProfile storage profile = userProfiles[msg.sender];
        profile.reportsSubmitted++;
        profile.lastReportTime = block.timestamp;
        _updatePoints(msg.sender, true, POINTS_FOR_REPORT, "Report submission");
        
        emit ReportSubmitted(reportId, msg.sender);
    }

    function voteReport(uint256 _reportId, bool _isUpvote) external {
        require(!reportVotes[_reportId][msg.sender], "Already voted");
        
        Report storage report = reports[_reportId];
        require(report.reporter != msg.sender, "Cannot vote own report");
        require(report.status != ReportStatus.Solved, "Report already solved");
        require(report.status != ReportStatus.Flagged, "Report is flagged");

        if (_isUpvote) {
            report.upvotes++;
            _updatePoints(report.reporter, true, POINTS_FOR_UPVOTE, "Received upvote");
            
            if (report.status == ReportStatus.Active && report.upvotes >= 3) {
                report.status = ReportStatus.Active;
                emit ReportStatusUpdated(_reportId, ReportStatus.Active);
            }
        } else {
            report.downvotes++;
            _updatePoints(report.reporter, false, POINTS_DEDUCTION_DOWNVOTE, "Received downvote");

            if (report.downvotes >= 5 && report.downvotes > report.upvotes * 2) {
                report.status = ReportStatus.Flagged;
                emit ReportStatusUpdated(_reportId, ReportStatus.Flagged);
            }
        }

        reportVotes[_reportId][msg.sender] = true;
        emit ReportVoted(_reportId, msg.sender, _isUpvote);
    }

    function markReportSolved(uint256 _reportId) external {
        Report storage report = reports[_reportId];
        require(msg.sender == report.reporter, "Only reporter can mark solved");
        require(report.status == ReportStatus.Active, "Report must be active");
        require(!report.isSolved, "Already solved");
        
        report.status = ReportStatus.Solved;
        report.isSolved = true;
        
        UserProfile storage profile = userProfiles[msg.sender];
        profile.successfulReports++;
        _updatePoints(msg.sender, true, POINTS_FOR_SOLVING, "Report solved");
        
        emit ReportStatusUpdated(_reportId, ReportStatus.Solved);
    }

    function markReportFlagged(uint256 _reportId) external {
        Report storage report = reports[_reportId];
        require(msg.sender == report.reporter, "Only reporter can mark solved");
        require(report.status == ReportStatus.Active, "Report must be active");
        require(!report.isSolved, "Already solved");

        report.status = ReportStatus.Flagged;

        _updatePoints(msg.sender, false, POINTS_DEDUCTION_DOWNVOTE, "Report is Flagged");
    }

    function _updatePoints(
        address _user,
        bool isAdd,
        uint256 _points,
        string memory _reason
    ) internal {
        UserProfile storage profile = userProfiles[_user];
        
        if (isAdd) {
            profile.points += _points;
        } else {
            if (profile.points >= _points) {
                profile.points -= _points;
            } else {
                profile.points = 0;
            }
        }
        
        emit PointsUpdated(_user, profile.points, _reason);
    }

    function getReport(uint256 _reportId) external view returns (
        string memory publicLocation,
        string memory mediaCID,
        string memory category,
        uint256 priority,
        uint256 timestamp,
        ReportStatus status,
        address reporter,
        uint256 upvotes,
        uint256 downvotes,
        bool isSolved
    ) {
        Report storage report = reports[_reportId];
        return (
            report.publicLocation,
            report.mediaCID,
            report.category,
            report.priority,
            report.timestamp,
            report.status,
            report.reporter,
            report.upvotes,
            report.downvotes,
            report.isSolved
        );
    }

    function getUserProfile(address _user) external view returns (
        uint256 points,
        uint256 reportsSubmitted,
        uint256 successfulReports,
        uint256 lastReportTime
    ) {
        UserProfile storage profile = userProfiles[_user];
        return (
            profile.points,
            profile.reportsSubmitted,
            profile.successfulReports,
            profile.lastReportTime
        );
    }

    function hasVoted(uint256 _reportId, address _user) external view returns (bool) {
        return reportVotes[_reportId][_user];
    }

    function getAllReports(uint256 _offset, uint256 _limit) 
        external 
        view 
        returns (ReportView[] memory reportArray, uint256 total) 
    {
        require(_offset <= reportCount, "Offset out of bounds");
        
        uint256 remaining = reportCount - _offset;
        uint256 count = remaining < _limit ? remaining : _limit;
        
        reportArray = new ReportView[](count);
        
        for (uint256 i = 0; i < count; i++) {
            uint256 currentId = _offset + i + 1;
            Report storage currentReport = reports[currentId];
            
            reportArray[i] = ReportView({
                reportId: currentId,
                details: currentReport.details,
                reportHash: currentReport.reportHash,
                publicLocation: currentReport.publicLocation,
                mediaCID: currentReport.mediaCID,
                category: currentReport.category,
                priority: currentReport.priority,
                timestamp: currentReport.timestamp,
                status: currentReport.status,
                reporter: currentReport.reporter,
                upvotes: currentReport.upvotes,
                downvotes: currentReport.downvotes,
                isSolved: currentReport.isSolved
            });
        }
        
        return (reportArray, reportCount);
    }

    function getUserReports(
        address _user,
        uint256 _offset,
        uint256 _limit
    ) external view returns (ReportView[] memory userReports, uint256 totalUserReports) {
        uint256 userReportCount = 0;
        for (uint256 i = 1; i <= reportCount; i++) {
            if (reports[i].reporter == _user) {
                userReportCount++;
            }
        }

        require(_offset <= userReportCount, "Offset out of bounds");

        uint256 remaining = userReportCount - _offset;
        uint256 count = remaining < _limit ? remaining : _limit;

        userReports = new ReportView[](count);

        uint256 found = 0;
        uint256 added = 0;

        for (uint256 i = 1; i <= reportCount && added < count; i++) {
            if (reports[i].reporter == _user) {
                if (found >= _offset) {
                    Report storage currentReport = reports[i];
                    userReports[added] = ReportView({
                        reportId: i,
                        details: currentReport.details,
                        reportHash: currentReport.reportHash,
                        publicLocation: currentReport.publicLocation,
                        mediaCID: currentReport.mediaCID,
                        category: currentReport.category,
                        priority: currentReport.priority,
                        timestamp: currentReport.timestamp,
                        status: currentReport.status,
                        reporter: currentReport.reporter,
                        upvotes: currentReport.upvotes,
                        downvotes: currentReport.downvotes,
                        isSolved: currentReport.isSolved
                    });
                    added++;
                }
                found++;
            }
        }

        return (userReports, userReportCount);
    }
}