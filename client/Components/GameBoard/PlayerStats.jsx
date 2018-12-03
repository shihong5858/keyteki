import React from 'react';
import PropTypes from 'prop-types';

import Avatar from '../Site/Avatar';

export class PlayerStats extends React.Component {
    constructor() {
        super();

        this.sendUpdate = this.sendUpdate.bind(this);
    }

    sendUpdate(type, direction) {
        this.props.sendGameMessage('changeStat', type, direction === 'up' ? 1 : -1);
    }

    getStatValueOrDefault(stat) {
        if(!this.props.stats) {
            return 0;
        }

        return this.props.stats[stat] || 0;
    }

    getButton(stat, name, statToSet = stat) {
        return (
            <div className='state'>
                { this.props.showControls ? <button className='btn btn-stat' onClick={ this.sendUpdate.bind(this, statToSet, 'down') }>
                    <img src='/img/Minus.png' title='-' alt='-' />
                </button> : null }
                <div className={ `stat-image ${stat}` }>
                    <div className='stat-value'>{ this.getStatValueOrDefault(stat) }</div>
                </div>
                { this.props.showControls ? <button className='btn btn-stat' onClick={ this.sendUpdate.bind(this, statToSet, 'up') }>
                    <img src='/img/Plus.png' title='+' alt='+' />
                </button> : null }
            </div>
        );
    }

    onSettingsClick(event) {
        event.preventDefault();

        if(this.props.onSettingsClick) {
            this.props.onSettingsClick();
        }
    }

    getHouses() {
        return (
            <div className='state'>
                { this.props.houses.map(house => (<img className='img-responsive' src={ `/img/house/${house}.png` } title={ house } />)) }
            </div>
        );
    }

    render() {
        var playerAvatar = (
            <div className='player-avatar'>
                <Avatar username={ this.props.user ? this.props.user.username : undefined } />
                <b>{ this.props.user ? this.props.user.username : 'Noone' }</b>
            </div>);

        return (
            <div className='panel player-stats'>
                { playerAvatar }

                { this.getButton('amber', 'Amber') }
                { this.getButton('chains', 'Chains') }

                { this.props.houses ? this.getHouses() : null }

                { this.props.firstPlayer ? <div className='state'><div className='first-player'>First player</div></div> : null }

                {
                    this.props.activeHouse &&
                    <div className='state'>
                        <div className='hand-size'>Active House: </div>
                        <img className='house-image' src={ `/img/house/${this.props.activeHouse}.png` } title={ this.props.activeHouse } />
                    </div>
                }

                { this.props.showMessages &&
                    <div className='state chat-status'>
                        {
                            this.props.showManualMode &&
                            <div className='state'>
                                <button
                                    className={ 'btn btn-transparent ' + (this.props.manualModeEnabled ? 'manual' : 'auto') }
                                    onClick={ this.props.onManualModeClick } >
                                    <span className='glyphicon glyphicon-wrench' />
                                    <span>{ ' Manual Mode ' + (this.props.manualModeEnabled ? ' Enabled' : 'Disabled') }</span>
                                </button>
                            </div>
                        }
                        <div className='state'>
                            <button className='btn btn-transparent' onClick={ this.onSettingsClick.bind(this) }><span className='glyphicon glyphicon-cog' />Settings</button>
                        </div>
                        <div onClick={ this.props.onMessagesClick }>
                            <button className='btn btn-transparent'>
                                <span className='glyphicon glyphicon-envelope' />
                                <span className='chat-badge badge progress-bar-danger'>{ this.props.numMessages || null }</span>
                            </button>
                        </div>
                    </div>
                }
            </div>
        );
    }
}

PlayerStats.displayName = 'PlayerStats';
PlayerStats.propTypes = {
    activeHouse: PropTypes.string,
    firstPlayer: PropTypes.bool,
    houses: PropTypes.array,
    manualModeEnabled: PropTypes.bool,
    numMessages: PropTypes.number,
    onManualModeClick: PropTypes.func,
    onMessagesClick: PropTypes.func,
    onSettingsClick: PropTypes.func,
    playerName: PropTypes.string,
    sendGameMessage: PropTypes.func,
    showControls: PropTypes.bool,
    showManualMode: PropTypes.bool,
    showMessages: PropTypes.bool,
    stats: PropTypes.object,
    user: PropTypes.object
};

export default PlayerStats;